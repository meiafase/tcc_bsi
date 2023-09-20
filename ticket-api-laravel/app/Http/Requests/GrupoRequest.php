<?php

namespace App\Http\Requests;

use App\Http\Requests\BaseRequest;

class GrupoRequest extends BaseRequest
{
    private $arrMessages = array();

    public function authorize()
    {

        return true;
    }

    public function rules()
    {

        if ($this->route()->uri() == "api/grupo" && $this->route()->methods()[0] == "POST") {
            return $this->rulesCadastrar();
        }

        return [];
    }
    public function rulesCadastrar()
    {

        $rules = [
            "titulo"    => "required|string",
        ];
        $this->arrMessages = [
            "titulo.required"   => "Campo título obrigatório",
            "titulo.string"     => "O campo de titulo deve ser do tipo texto",
        ];

        return $rules;
    }
    public function messages()
    {
        return $this->arrMessages;
    }
}
