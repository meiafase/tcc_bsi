<?php

namespace App\Http\Requests;

use App\Http\Requests\BaseRequest;


class CategoriaRequest extends BaseRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    private $arrMessages = array();
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
        if ($this->route()->uri() == "api/categoria" && $this->route()->methods()[0] == "POST") {
            return $this->rulesCadastrar();
        }
        return [];
    }

    public function rulesCadastrar()
    {
        $rules = [
            "titulo" => "required|string"
        ];

        $this->arrMessages = [
            "titulo.required"   => "Campo título obrigatório",
            "titulo.string"     => "O campo de titulo deve ser do tipo texto"
        ];
        return $rules;
    }

    public function messages()
    {
        return $this->arrMessages;
    }

}
