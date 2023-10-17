<?php

namespace App\Services;

use App\Repositories\PedidoRepository;
use App\Services\GrupoService;
use App\Services\UsuarioService;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Http;
use Exception;

class PedidoService
{
    protected $repository;
    protected $grupoService;
    protected $usuarioService;
    protected $mensagemService;
    protected $historicoService;
    protected $anexoService;

    public function __construct(
        PedidoRepository $repository,
        GrupoService $grupoService,
        UsuarioService $usuarioService,
        MensagemService $mensagemService,
        HistoricoService $historicoService,
        AnexoService $anexoService,
    ) {
        $this->repository = $repository;
        $this->grupoService = $grupoService;
        $this->usuarioService = $usuarioService;
        $this->mensagemService = $mensagemService;
        $this->historicoService = $historicoService;
        $this->anexoService = $anexoService;

    }

    public function cadastrar($dados)
    {
        try {

            DB::beginTransaction();
            $dados['usuario_id'] = $dados['usuario']->id;
            $dadosPedido = [];

            $dadosPedido['prazo_limite'] = $this->definirPrazo($dados['dadosPedido']->prazo_horas);

            //Cadastrar pedido
            $dadosPedido = array(
                "solicitante_id" => $dados['usuario_id'],
                "area_id" => $dados['area_id'],
                "assunto_id" => $dados['assunto_id'],
                "categoria_id" => $dados['categoria_id'],
                "sub_categoria_id" => @$dados['sub_categoria_id'],
                "status_id" => 1,
                "prazo_limite" => $dadosPedido['prazo_limite'],
                "prioridade_id" => $dados['dadosPedido']->prioridade_id,
            );

            $dadosPedido['responsavel_id'] = $this->definirResponsavel($dados['dadosPedido']);

            $pedido = $this->repository->criar($dadosPedido);

            //Cadastro mensagem
            $mensagem = $this->mensagemService->cadastrar($pedido->id, $dados['usuario']->id, $dados['mensagem']);

            //Cadastrar Histórico
            if ($pedido->responsavel_id > 0) {
                $responsavel = $this->usuarioService->buscar($pedido->responsavel_id);
                $responsavel = $responsavel['dados'];
                $descricaoHist = "Solicitação nº " . str_pad($pedido->id, 6, 0, STR_PAD_LEFT) . " cadastrada e atribuída automaticamente para {$responsavel->name}";
            } else {
                $descricaoHist = "Solicitação nº " . str_pad($pedido->id, 6, 0, STR_PAD_LEFT) . " cadastrada";
            }
            $this->historicoService->cadastrar($dados['usuario_id'], $pedido->id, $descricaoHist);

            //Cadastrar anexo
            if (isset($dados['anexo']) && sizeof(@$dados['anexo']) > 0) {
                foreach ($dados['anexo'] as $dadosAnexo) {
                    $envioArquivo = $this->enviarArquivo($dadosAnexo);
                    $this->anexoService->cadastrar(array_merge(array("mensagem_id" => $mensagem->id), $envioArquivo['info']));
                }
            }

            DB::commit();
            return array(
                'status' => true,
                'mensagem' => $descricaoHist,
                'dados' => $pedido
            );

        } catch (Exception $ex) {
            DB::rollBack();
            return array(
                'status'    => false,
                'mensagem'  => "Erro ao cadastrar categoria.",
                'exception' => $ex->getMessage()
            );
        }
    }

    private function definirPrazo($qtdeHoras)
    {
        $qtdeHoras = explode(":", $qtdeHoras);
        $qtdeHoras =$qtdeHoras[0] + ($qtdeHoras[1] / 60) + ($qtdeHoras[2] / 3600);

        $prazo_final = '';
        $data_hora = Carbon::now();

        // Horários de trabalho
        $inicio_almoco = $data_hora->copy()->setTime(12, 0, 0);
        $fim_almoco = $data_hora->copy()->setTime(13, 30, 0);
        $limite_inicio_dia = $data_hora->copy()->setTime(8, 0, 0);
        $limite_fim_dia = $data_hora->copy()->setTime(17, 30, 0);

        if ($data_hora < $limite_inicio_dia) {
            $data_hora = $limite_inicio_dia;
        }

        if ($data_hora > $limite_fim_dia) {
            $data_hora->addDay()->setTime(8, 0, 0);
            $inicio_almoco = $data_hora->copy()->setTime(12, 0, 0);
            $fim_almoco = $data_hora->copy()->setTime(13, 30, 0);
            $limite_inicio_dia = $data_hora->copy()->setTime(8, 0, 0);
            $limite_fim_dia = $data_hora->copy()->setTime(17, 30, 0);
        }

        while ($qtdeHoras > 0) {
            $feriado = $this->verificaFeriado($data_hora);

            if ($data_hora->isWeekend() || $feriado) {
                $data_hora->addDay()->setTime(8, 0, 0);
                $inicio_almoco->addDay()->setTime(12, 0, 0);
                $fim_almoco->addDay()->setTime(13, 30, 0);
                $limite_inicio_dia->addDay()->setTime(8, 0, 0);
                $limite_fim_dia->addDay()->setTime(17, 30, 0);
                continue;
            }
            if ($data_hora >= $inicio_almoco && $data_hora <= $fim_almoco) {
                $data_hora = $fim_almoco;
            }

            $diffInSeconds = $limite_fim_dia->diffInSeconds($data_hora);
            $hours = $diffInSeconds / 3600;

            if ($hours > 0) {
                if ($qtdeHoras > $hours) {
                    $qtdeHoras -= $hours;
                    $data_hora_nova = $data_hora->copy()->addSeconds($hours * 3600);

                    if ($data_hora < $inicio_almoco && (($data_hora_nova > $fim_almoco) || ($data_hora_nova >= $inicio_almoco && $data_hora_nova <= $fim_almoco))) {
                        $qtdeHoras += 1.5;
                    } else {
                        $data_hora = $data_hora_nova;
                    }
                } else {
                    $prazo_final = $data_hora->copy()->addSeconds($qtdeHoras * 3600);

                    if ($data_hora < $inicio_almoco && (($prazo_final > $fim_almoco) || ($prazo_final >= $inicio_almoco && $prazo_final <= $fim_almoco))) {
                        $novo_prazo_final = $prazo_final->copy()->addSeconds(1.5 * 3600);

                        if ($novo_prazo_final > $limite_fim_dia) {
                            $qtdeHoras += 1.5;
                        } else {
                            $prazo_final = $novo_prazo_final;
                            $qtdeHoras = 0;
                        }
                    } else {
                        $qtdeHoras = 0;
                    }
                }
            }


            $data_hora->addDay()->setTime(8, 0, 0);
            $inicio_almoco->addDay()->setTime(12, 0, 0);
            $fim_almoco->addDay()->setTime(13, 30, 0);
            $limite_inicio_dia->addDay()->setTime(8, 0, 0);
            $limite_fim_dia->addDay()->setTime(17, 30, 0);
        }
        return $prazo_final->format('Y-m-d H:i:s');
    }

    private function verificaFeriado($data_hora)
    {
        $ano = $data_hora->year;

        $feriados = Http::get("https://brasilapi.com.br/api/feriados/v1/" . $ano);
        $feriados = json_decode($feriados);

        $data_formatada = $data_hora->format('Y-m-d');

        foreach ($feriados as $feriado) {
            if ($feriado->date === $data_formatada) {
                return true;
            }
        }
        return false;
    }

    private function definirResponsavel($dados)
    {
        $responsavel_id = 0;
        $proximoResponsavel = NULL;
        $dataAtual = Carbon::now();

        if ($dados->equipe_id > 0 && is_null($dados->responsavel_id)) {
            $grupo = $this->grupoService->buscar($dados->equipe_id);
            if ($grupo['dados']->ativo) {
                $proximoResponsavel = $this->repository->proximoResponsavelGrupo($dados->equipe_id);
                $responsavel_id = $proximoResponsavel->usuario_id;
                //registra atribuição
                $this->repository->marcarAtribuicaoRodizio($responsavel_id, $dados->equipe_id, $dataAtual);
            }
        } else if (!is_null($dados->responsavel_id) > 0 && is_null($dados->equipe_id)) {
            $usuario = $this->usuarioService->buscar($dados->responsavel_id);
            $permissao = $this->usuarioService->obterPermissaoUsuario($usuario['dados']);
            if (@$usuario['dados']->status && @$permissao->atender_chamados) {
                $responsavel_id = $usuario['dados']->id;
            }
        }
        return $responsavel_id;
    }

    private function enviarArquivo($arquivo)
    {
        $horario_agora = time();
        $arquivoDados = array(
            "nome_arquivo" => str_replace(' ', '_', (pathinfo($arquivo->getClientOriginalName(), PATHINFO_FILENAME)."_".$horario_agora)),
            "nome_arquivo_completo" => str_replace(' ','_', pathinfo($arquivo->getClientOriginalName(), PATHINFO_FILENAME)."_".$horario_agora.".".$arquivo->getClientOriginalExtension()),
            "extensao" => $arquivo->getClientOriginalExtension(),
            "tamanho" => $arquivo->getSize()
        );
        $arquivo->storeAs('uploads', $arquivoDados['nome_arquivo'] . '.' . $arquivoDados['extensao']);
        return ['info' => $arquivoDados];
    }

}
