<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\UsuarioService;


class UsuarioController extends Controller
{
    protected $service;
    public function __construct(UsuarioService $service)
    {
        $this->service = $service;
    }

    public function cadastrar()
    {
        return $this->service->cadastrar();
    }
}
