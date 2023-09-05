<?php

namespace App\Http\Requests;

use App\Http\Requests\BaseRequest;

class GrupoRequest extends BaseRequest
{
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
        return ["titulo" => "required"];
    }

    public function messages()
    {
        return ["titulo.required" => "Campo Título obrigatório"];
    }
}