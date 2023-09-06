<?php

namespace App\Http\Requests;

use App\Http\Requests\BaseRequest;

class SubCategoriaRequest extends BaseRequest
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
        if ($this->route()->uri() == "api/sub_categoria" && $this->route()->methods()[0] == "POST") {
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
            "titulo.required" => "Campo Título obrigatório"
        ];
        return $rules;
    }

    public function messages()
    {
        return $this->arrMessages;
    }
}
