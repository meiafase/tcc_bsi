<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Permissoes;
use App\Http\Requests\PermissoesRequest;
use App\Services\UsuarioService;
use App\Services\PermissoesService;

/**
 * @property UsuarioService $usuarioService
 */
class UsuarioController extends Controller
{
    protected $service;
    public function __construct(UsuarioService $service, PermissoesService $permissoesService)
    {
        $this->service = $service;
        $this->permissoesService = $permissoesService;
    }

    public function cadastrar()
    {
        return $this->service->cadastrar();
    }

    public function editar(Request $request)
    {
        return $this->service->editar($request->all());
    }

    public function buscar(int $id){
        return $this->service->buscar($id);
    }

    public function listarEquipe(PermissoesRequest $request): array
    {
        return $this->service->listarEquipe($request->usuario);
    }

    public function alterarPermissoes(PermissoesRequest $request, $usuario_id)
    {
        return $this->permissoesService->alterarPermissoes($request->dataRequest(), $usuario_id);
    }
}
