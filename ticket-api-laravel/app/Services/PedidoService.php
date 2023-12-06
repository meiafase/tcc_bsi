<?php

namespace App\Services;

use App\Repositories\PedidoRepository;
use App\Services\GrupoService;
use App\Services\UsuarioService;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Testing\MimeType;
use Illuminate\Support\Facades\Response;
use Carbon\Carbon;
use Illuminate\Support\Facades\Http;
use Exception;

use Illuminate\Support\Facades\Mail;
use App\Mail\SolicitacaoMail;

class PedidoService
{
    protected $repository;
    protected $grupoService;
    protected $usuarioService;
    protected $mensagemService;
    protected $historicoService;
    protected $anexoService;
    protected $statusService;

    public function __construct(
        PedidoRepository $repository,
        GrupoService $grupoService,
        UsuarioService $usuarioService,
        MensagemService $mensagemService,
        HistoricoService $historicoService,
        AnexoService $anexoService,
        StatusService $statusService,
        AvaliacaoService $avaliacaoService,
    ) {
        $this->repository = $repository;
        $this->grupoService = $grupoService;
        $this->usuarioService = $usuarioService;
        $this->mensagemService = $mensagemService;
        $this->historicoService = $historicoService;
        $this->anexoService = $anexoService;
        $this->statusService = $statusService;
        $this->avaliacaoService = $avaliacaoService;
    }

    public $arNameArquivos = [];

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
                "data_criacao" => now()
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
                //Envio de email ao responsavel
                $conteudo = array("pedido_id" => $pedido->id, "atribuicao" => true);
                Mail::to($responsavel['email'])->send(new SolicitacaoMail('Nova solicitação atribuída para você', $conteudo));
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

            //Envio de email ao solicitante
            $solicitante = $dados['usuario']['email'];
            $conteudo = array("pedido_id" => $pedido->id, "mensagem" => $descricaoHist);
            Mail::to($solicitante)->send(new SolicitacaoMail('Nova Solicitação', $conteudo));

            DB::commit();
            return array(
                'status' => true,
                'mensagem' => $descricaoHist,
                'dados' => $pedido
            );
        } catch (Exception $ex) {
            DB::rollBack();

            foreach ($this->arquivosEnviados() as $arquivo) {
                $this->deletarArquivo($arquivo);
            }

            return array(
                'status'    => false,
                'mensagem'  => "Erro ao cadastrar pedido.",
                'exception' => $ex->getMessage()
            );
        }
    }

    private function definirPrazo($qtdeHoras)
    {
        $qtdeHoras = explode(":", $qtdeHoras);
        $qtdeHoras = $qtdeHoras[0] + ($qtdeHoras[1] / 60) + ($qtdeHoras[2] / 3600);

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
        // $ano = "";
        $ano = $data_hora->year;
        $feriados = [];

        $feriados = Http::get("https://brasilapi.com.br/api/feriados/v1/" . $ano);

        if (json_decode($feriados)) {
            $feriados = json_decode($feriados);

            $data_formatada = $data_hora->format('Y-m-d');

            foreach ($feriados as $feriado) {
                if ($feriado->date === $data_formatada) {
                    return true;
                }
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

    public function cadastrarMensagem($pedido_id, $dados)
    {
        try {
            DB::beginTransaction();

            $dados['usuario_id'] = $dados['usuario']->id;

            //Cadastro mensagem
            $mensagem = $this->mensagemService->cadastrar($pedido_id, $dados['usuario_id'], $dados['mensagem']);

            //adicionar anexo se houver
            if (isset($dados['anexo']) && sizeof(@$dados['anexo']) > 0) {
                foreach ($dados['anexo'] as $dadosAnexo) {
                    $envioArquivo = $this->enviarArquivo($dadosAnexo);
                    $this->anexoService->cadastrar(array_merge(array("mensagem_id" => $mensagem->id), $envioArquivo['info']));
                }
            }
            $retorno_mensagem = $this->mensagemService->obter($mensagem->id, array('anexos', 'usuario'));

            //Inserir Historico
            $descricaoHist = "Solicitação nº " . str_pad($pedido_id, 6, 0, STR_PAD_LEFT) . " foi atualizada";
            $this->historicoService->cadastrar($dados['usuario_id'], $pedido_id, $descricaoHist);

            //Envio de email
            $pedido = $this->repository->obter($pedido_id);
            if ($pedido->solicitante_id == $dados['usuario_id'] && $pedido->responsavel_id > 0) {
                $destinatario_id = $pedido->responsavel_id;
            } elseif ($pedido->responsavel_id == $dados['usuario_id']) {
                $destinatario_id = $pedido->solicitante_id;
            } elseif ($dados['usuario_id'] != $pedido->solicitante_id && $dados['usuario_id'] != $pedido->responsavel_id) {
                $destinatario_id = $pedido->solicitante_id;
            } else {
                $destinatario_id = '';
            }
            if ($destinatario_id) {
                $destinatario = $this->usuarioService->buscar($destinatario_id);
                $conteudo = array("pedido_id" => $pedido_id, "atualizacao" => true);
                Mail::to($destinatario['dados']['email'])->send(new SolicitacaoMail('Solicitação Atualizada', $conteudo));
            }

            DB::commit();
            return array(
                'status' => true,
                'mensagem' => "Mensagem cadastrada com sucesso",
                'dados' => $retorno_mensagem
            );
        } catch (Exception $ex) {
            DB::rollBack();

            foreach ($this->arquivosEnviados() as $arquivo) {
                $this->deletarArquivo($arquivo);
            }

            return array(
                'status' => false,
                'mensagem' => 'Erro ao cadastrar a mensagem',
                'exception' => $ex->getMessage()
            );
        }
    }

    public function buscar($pedido_id, $dados)
    {
        try {
            DB::beginTransaction();

            $with = array("solicitante", "responsavel", "mensagens", "area", "categoria", "subCategoria", "prioridade", "status", "assunto", "avaliacao");

            $pedido = $this->repository->obter($pedido_id, $with);

            DB::commit();
            return array(
                'status'     => true,
                'mensagem'     => "Pedido listado com sucesso.",
                'dados'     =>  $pedido
            );
        } catch (Exception $ex) {
            DB::rollBack();
            return array(
                'status'     => false,
                'mensagem'     => "Erro ao listar pedido.",
                'exception' => $ex->getMessage()
            );
        }
    }

    public function iniciarAtendimento($pedido_id, $dados)
    {
        try {
            DB::beginTransaction();

            $pedido = $this->repository->obter($pedido_id);

            if ($pedido["status_id"] != 1) {
                return array(
                    'status' => true,
                    'mensagem' => "Atendimento já iniciado!",
                    'dados' => []
                );
            }

            $usuario_id = $dados['usuario']->id;
            $novo_responsavel = $this->usuarioService->buscar($usuario_id);
            $novo_responsavel = $novo_responsavel['dados'];
            $arrAlteracao = array('inicio_atendimento' => date("Y-m-d H:i:s"), 'status_id' => 2, 'responsavel_id' => $novo_responsavel['id']);
            $descricaoHist = "Atendimento iniciado por {$novo_responsavel->name}";

            $this->repository->atualizarColuna($pedido_id, $arrAlteracao);
            $this->historicoService->cadastrar($usuario_id, $pedido_id, $descricaoHist);

            //Envio de email ao solicitante
            $solicitante = $this->usuarioService->buscar($pedido->solicitante_id);
            $conteudo = array("pedido_id" => $pedido_id, "atualizacao" => true);
            Mail::to($solicitante['dados']['email'])->send(new SolicitacaoMail('Solicitação Atualizada', $conteudo));

            DB::commit();
            return array(
                'status'     => true,
                'mensagem'     => "Atendimento iniciado com sucesso",
                'dados'     =>  []
            );
        } catch (Exception $ex) {
            DB::rollBack();
            return array(
                'status'     => false,
                'mensagem'     => "Erro ao iniciar o atendimento",
                'exception' => $ex->getMessage()
            );
        }
    }

    public function baixarAnexo($mensagem_id, $anexo_id)
    {
        // $anexo = $this->anexoService->obter($anexo_id);

        // if ($anexo->mensagem_id == $mensagem_id) {
        //     $arquivo = $this->buscarArquivo($anexo->nome_arquivo_completo);

        //     $dados = array("nome_arquivo" => $anexo->nome_arquivo_completo, "arquivo" => $arquivo);
        // } else {
        //     $dados = false;
        // }

        // // dd($dados );
        // if (!$dados) {
        //     return array(
        //         'status' => true,
        //         'mensagem' => "Não foi possível baixar o arquivo",
        //         'dados' => []
        //     );
        // }

        // $headers = [
        //     'Content-Type'        => 'Content-Type: '.MimeType::from($dados['nome_arquivo']),
        //     'Content-Disposition' => 'attachment; filename="'. $dados['nome_arquivo'] .'"',
        // ];

        // return Response::make($dados['arquivo'], 200, $headers);


        $nome_arquivo = $this->anexoService->obter($anexo_id)->nome_arquivo_completo;

        $caminho_arquivo = 'uploads/' . $nome_arquivo;

        if (Storage::exists($caminho_arquivo)) {
            $arquivo = Storage::get($caminho_arquivo);

            $headers = [
                'Content-Type' => Storage::mimeType($caminho_arquivo),
                'Content-Disposition' => 'attachment; filename="' . $nome_arquivo . '"',
            ];

            return response()->make($arquivo, 200, $headers);
        }

        return response()->json(['message' => 'Arquivo não encontrado'], 404);
    }

    public function alterarStatus($pedido_id, $dados)
    {
        try {
            DB::beginTransaction();

            $usuario_id = $dados['usuario']->id;
            $status = $this->statusService->obter($dados['status_id']);
            $descricaoHist = "Status da solicitação alterada: {$status->descricao}";
            $pedido = $this->repository->obter($pedido_id);
            $solicitante = $this->usuarioService->buscar($pedido['solicitante_id']);

            $dados['status_id'] != 5 ? @$dados['justificativa'] = NULL : NULL;
            $arrAlteracao = array('status_id' => $dados['status_id'], 'justificativa_cancelar' => @$dados['justificativa']);

            if ($dados['status_id'] == 3) {
                $fim_atendimento = now();
                $inicio_atendimento = Carbon::create($pedido->inicio_atendimento);
                $tempo_atendimento = $fim_atendimento->diffInSeconds($inicio_atendimento);

                $arrAlteracao = array_merge(array("fim_atendimento" => $fim_atendimento, "tempo_total_atendimento" => $tempo_atendimento), $arrAlteracao);
                $descricaoHist = "Atendimento concluído, aguardando avaliação do solicitante";

                //Envio de email ao solicitante - concluído
                $conteudo = array("pedido_id" => $pedido_id, "atendimento_concluido" => true);
                Mail::to($solicitante['dados']['email'])->send(new SolicitacaoMail('Solicitação - Atendimento Concluído', $conteudo));
            }

            if ($dados['status_id'] == 5) {
                //Envio de email ao solicitante - cancelado
                $conteudo = array("pedido_id" => $pedido_id, "justificativa" => $dados['justificativa']);
                Mail::to($solicitante['dados']['email'])->send(new SolicitacaoMail('Solicitação cancelada', $conteudo));
            }

            $this->repository->atualizarColuna($pedido_id, $arrAlteracao);
            $this->historicoService->cadastrar($usuario_id, $pedido_id, $descricaoHist);

            DB::commit();
            return array(
                'status' => true,
                'mensagem' => "Status alterado com sucesso",
                'dados' => []
            );
        } catch (Exception $ex) {
            DB::rollBack();
            return array(
                'status' => false,
                'mensagem' => 'Erro ao alterar status',
                'exception' => $ex->getMessage()
            );
        }
    }

    public function cadastrarAvaliacao($pedido_id, $dados)
    {
        try {
            DB::beginTransaction();

            $avaliacao = $this->avaliacaoService->cadastrar($pedido_id, $dados);

            //Grava histórico
            $this->historicoService->cadastrar($dados['usuario']->id, $pedido_id, "Avaliação registrada com sucesso por {$dados['usuario']->name}, Nota: {$dados['nota']}");

            //Atualiza Pedido
            $this->repository->atualizarColuna($pedido_id, array('nota_solicitante' => $dados['nota'], 'status_id' => 4));

            //Envio de email ao responsavel - avaliado
            $pedido = $this->repository->obter($pedido_id);
            $responsavel = $this->usuarioService->buscar($pedido->responsavel_id);
            $conteudo = array("pedido_id" => $pedido_id, "avaliacao" => true);
            Mail::to($responsavel['dados']['email'])->send(new SolicitacaoMail('Seu atendimento foi avaliado', $conteudo));

            DB::commit();

            return array(
                'status' => true,
                'mensagem' => "Avaliação cadastrada com sucesso",
                'dados' => $avaliacao
            );
        } catch (Exception $ex) {
            DB::rollBack();

            return array(
                'status' => false,
                'mensagem' => 'Erro ao cadastrar a avaliação',
                'exception' => $ex->getMessage()
            );
        }
    }

    public function filtrarRespSolic($tipo_id, $dados)
    {
        try {
            $retorno = [];

            if ($tipo_id == 1) {
                $info = [
                    'filtro'    => "ped.solicitante_id = " . $dados['usuario']->id,
                    'variavel'  => 'responsavel'
                ];
            }

            if ($tipo_id == 2) {
                $info = [
                    'filtro'    => "ped.responsavel_id = " . $dados['usuario']->id,
                    'variavel'  => 'solicitante'
                ];
            }

            $retorno = $this->repository->filtrarRespSolic($info);

            if ($retorno) {
                return array(
                    'status' => true,
                    'mensagem' => "Pesquisa realizada com sucesso.",
                    'dados' => $retorno
                );
            } else {
                return array(
                    'status' => true,
                    'mensagem' => "Não há registros.",
                    'dados' => []
                );
            }
        } catch (Exception $ex) {
            throw $ex;
            return array(
                'status' => false,
                'mensagem' => 'Erro ao realizar a busca.',
                'exception' => $ex
            );
        }
    }

    public function buscarHistorico($pedido_id)
    {
        try {
            $historico = $this->historicoService->filtrar($pedido_id);

            return array(
                'status' => true,
                'mensagem' => "Histórico da solicitação nº " . str_pad($pedido_id, 6, 0, STR_PAD_LEFT),
                'dados' => $historico
            );
        } catch (Exception $ex) {
            return array(
                'status' => false,
                'mensagem' => 'Erro ao buscar histórico',
                'exception' => $ex
            );
        }
    }

    public function listarPedidos($dados)
    {
        try {
            $retorno = [];

            $retorno = $this->repository->filtrarListagem($dados);

            if ($retorno) {
                return array(
                    'status' => true,
                    'mensagem' => "Pesquisa realizada com sucesso.",
                    'dados' => $retorno
                );
            } else {
                return array(
                    'status' => true,
                    'mensagem' => "Não há registros.",
                    'dados' => []
                );
            }
        } catch (Exception $ex) {
            throw $ex;
            return array(
                'status' => false,
                'mensagem' => 'Erro ao realizar a busca.',
                'exception' => $ex->getMessage()
            );
        }
    }

    public function atribuirUsuario($pedido_id, $dados)
    {
        try {

            DB::beginTransaction();

            $usuario_id = $dados['usuario']->id;
            $novo_responsavel_id = $dados['responsavel_id'];

            $this->repository->atualizarColuna($pedido_id, array('responsavel_id' => $novo_responsavel_id));

            $novo_responsavel = $this->usuarioService->buscar($novo_responsavel_id);
            $nome = $novo_responsavel['dados']['name'];

            $this->historicoService->cadastrar($usuario_id, $pedido_id, "Pedido atribuído para {$nome}");

            //Envio de email ao responsavel
            $responsavel = $novo_responsavel['dados']['email'];
            $conteudo = array("pedido_id" => $pedido_id, "atribuicao" => true);
            Mail::to($responsavel)->send(new SolicitacaoMail('Nova solicitação atribuída para você', $conteudo));

            DB::commit();

            return array(
                'status' => true,
                'mensagem' => "Responsável atribuído com sucesso",
                'dados' => []
            );
        } catch (Exception $ex) {
            DB::rollBack();

            return array(
                'status' => false,
                'mensagem' => 'Erro ao atribuir o responsável',
                'exception' => $ex
            );
        }
    }

    private function enviarArquivo($arquivo)
    {
        $horario_agora = time();
        $arquivoDados = array(
            "nome_arquivo" => str_replace(' ', '_', (pathinfo($arquivo->getClientOriginalName(), PATHINFO_FILENAME) . "_" . $horario_agora)),
            "nome_arquivo_completo" => str_replace(' ', '_', pathinfo($arquivo->getClientOriginalName(), PATHINFO_FILENAME) . "_" . $horario_agora . "." . $arquivo->getClientOriginalExtension()),
            "extensao" => $arquivo->getClientOriginalExtension(),
            "tamanho" => $arquivo->getSize()
        );
        $arquivo->storeAs('uploads', $arquivoDados['nome_arquivo'] . '.' . $arquivoDados['extensao']);
        $this->arNameArquivos[] = $arquivoDados['nome_arquivo_completo'];
        return ['info' => $arquivoDados];
    }

    public function arquivosEnviados()
    {
        return $this->arNameArquivos;
    }

    public function deletarArquivo($nome_arquivo)
    {
        $caminho_arquivo = 'uploads/' . $nome_arquivo;

        if (Storage::exists($caminho_arquivo)) {
            Storage::delete($caminho_arquivo);
            return true;
        }

        return false;
    }

    public function buscarArquivo($nome_arquivo)
    {
        // return Storage::get($nome_arquivo);
        $caminho_arquivo = 'uploads/' . $nome_arquivo;

        if (Storage::exists($caminho_arquivo)) {
            Storage::get($caminho_arquivo);
            return true;
        }

        return false;
    }
}
