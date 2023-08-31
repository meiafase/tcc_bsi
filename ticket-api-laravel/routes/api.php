<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AssuntoController;
use App\Http\Controllers\UsuarioController;

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
});
Route::prefix('usuario')->middleware('auth:sanctum')->group(function () {
    Route::put('/', [UsuarioController::class, 'editar']);
});
