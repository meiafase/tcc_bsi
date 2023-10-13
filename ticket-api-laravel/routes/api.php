<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AssuntoController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\SubCategoriaController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\GrupoController;
use App\Http\Controllers\AreaController;
use App\Http\Controllers\PedidoController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/login', [AuthController::class, 'login']);
Route::post('/usuario', [UsuarioController::class, 'cadastrar']);

Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

Route::prefix('assunto')->middleware('auth:sanctum')->group(function () {
    Route::post('/', [AssuntoController::class, 'cadastrar']);
    Route::get('/', [AssuntoController::class, 'listar']);
    Route::put('/{id}', [AssuntoController::class, 'editar']);
    Route::get('/{assunto_id}/categorias', [AssuntoController::class, 'buscarPorAssunto']);
    Route::get('/{assunto_id}/categoriasAtivas', [AssuntoController::class, 'listarPorCategoriasAtivas']);
});

Route::prefix('categoria')->middleware('auth:sanctum')->group(function () {
    Route::post('/', [CategoriaController::class, 'cadastrar']);
    Route::get('/{id}', [CategoriaController::class, 'buscar']);
    Route::put('/{id}', [CategoriaController::class, 'editar']);
});

Route::prefix('sub_categoria')->middleware('auth:sanctum')->group(function () {
    Route::post('/', [SubCategoriaController::class, 'cadastrar']);
    // Route::get('/', [SubCategoriaController::class, 'listar']);
    Route::put('/{id}', [SubCategoriaController::class, 'editar']);
});

Route::prefix('usuario')->middleware('auth:sanctum')->group(function () {
    Route::get('/equipe', [UsuarioController::class, 'listarEquipe']);
    Route::put('/', [UsuarioController::class, 'editar']);
    Route::get('/{id}', [UsuarioController::class, 'buscar']);
    Route::put('/permissoes/{usuario_id}', [UsuarioController::class, 'alterarPermissoes']);
});
Route::prefix('grupo')->middleware('auth:sanctum')->group(function () {
    Route::post('/', [GrupoController::class, 'cadastrar']);
    Route::put('/{id}', [GrupoController::class, 'editar']);
    Route::get('/listar/{area_id}', [GrupoController::class, 'listar']);
    Route::get('/{id}', [GrupoController::class, 'buscar']);
});

Route::prefix('area')->middleware('auth:sanctum')->group(function () {
    Route::get('/', [AreaController::class, 'listar']);
    Route::get('/{id}/assuntoAtivo', [AreaController::class, 'listarAssuntos']);
});

Route::prefix('pedido')->middleware('auth:sanctum')->group(function () {
    Route::post('/', [PedidoController::class, 'cadastrar']);
});
