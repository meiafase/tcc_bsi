<?php

namespace App\Http\Requests;
use App\Http\Requests\BaseRequest;
use App\Services\{CategoriaService, SubCategoriaService};
use Illuminate\Support\Facades\App;

class PedidoRequest extends BaseRequest
{
    private $arrMessages = array();
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        if ($this->route()->uri() == "api/pedido" && $this->route()->methods()[0] == "POST") {
            return $this->rulesCadastrar();
        }
        return [];
    }

    public function rulesCadastrar()
    {
        $this->categoriaService = App::make(CategoriaService::class);
        $this->subCategoriaService = App::make(SubCategoriaService::class);
        $info_adicional_required = false;
        $sub_categoria_required = false;
        $categoria = NULL;

        $dados = $this->request;
        if (!is_null($dados->get('categoria_id'))) {
            $categoria = $this->categoriaService->categoriaValidacao($dados->get('categoria_id'));
            $this->dadosPedido = $categoria['categoria'];
            $categoria['categoria']->possui_subcategorias ? $sub_categoria_required = true : $sub_categoria_required = false;
        }

        if ($sub_categoria_required) {
            if (!is_null($dados->get('sub_categoria_id'))) {
                $sub_categoria = $this->subCategoriaService->subCategoriaValidacao($dados->get('sub_categoria_id'));
                $this->dadosPedido = $sub_categoria['sub_categoria'];

                $arr_adicionais = $sub_categoria['sub_categoria']->adicionais->toArray();

                $arr_adicionais ? $info_adicional_required = true : $info_adicional_required = false;
                $info_adicional_required ? $info_adicional_required_size = $sub_categoria['possui_adicionais'] : NULL;

                $sub_categoria['sub_categoria']->uf ? $uf_required = true : $uf_required = false;
            }
        } else if (!is_null($categoria)) {
            $arr_adicionais = $categoria['categoria']->adicionais->toArray();

            $arr_adicionais ? $info_adicional_required = true : $info_adicional_required = false;
            $info_adicional_required ? $info_adicional_required_size = $categoria["categoria"]['possui_adicionais'] : NULL;
        }

        $rules =
            [
                "area_id" => "required",
                "assunto_id" => "required",
                "categoria_id" => "required",
                "mensagem" => "required"
            ];

        $sub_categoria_required ? $rules = array_merge($rules, array("sub_categoria_id" => "required")) : NULL;
        $info_adicional_required ? $rules = array_merge($rules, array("info_adicional" => "required|array|min:{$info_adicional_required_size}")) : NULL;

        $this->arrMessages = [
            "area_id.required"  => "Campo Área/Setor obrigatório",
            "assunto_id.required"  => "Campo Assunto obrigatório",
            "categoria_id.required"  => "Campo Categoria obrigatório",
            "mensagem.required"  => "Campo Mensagem obrigatório",
            "sub_categoria_id.required"  => "Campo SubCategoria obrigatório",
            "info_adicional.required"  => "Campo Informações Adicionais obrigatório",
            "info_adicional.min"  => "Campo Informações Adicionais obrigatório o preenchimento de pelo menos :min item(ns)"
        ];

        return $rules;
    }


    public function messages()
    {
        return $this->arrMessages;
    }

}
