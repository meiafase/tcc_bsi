<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Services\UsuarioService;
use Exception;

class AuthController extends Controller
{
    private $usuarioService;

    public function __construct(UsuarioService $usuarioService)
    {
        $this->usuarioService = $usuarioService;
    }

    public function login(Request $request)
    {
        try{
            $credentials = $request->only('email', 'password');
            if (Auth::attempt($credentials)) {
                $user = Auth::user();
                $token = $user->createToken('token-name')->plainTextToken;

                //Cria permissao
                $usuario = $this->usuarioService->validarPermissoesLogin($user->id);

                return array(
                    'status' => true,
                    'mensagem' => "Login realizado com sucesso.",
                    // 'dados' =>  response()->json(['token' => $token, 'usuario' => $user], 200)
                    'dados' =>  ['token' => $token, 'usuario' => $user]
                );
            } else {
                return array(
                    'status' => false,
                    'mensagem' => "Usuário não autorizado.",
                    'dados' =>  []
                );
            }
        } catch (Exception $ex) {
            return array(
                'status' => false,
                'mensagem' => "Erro ao realizar o login.",
                'exception' => $ex->getMessage()
            );
        }
    }

    public function logout(Request $request)
    {
        try{
            $user = $request->user();
            // Revogar todos os tokens do usuário
            $user->tokens->each(function ($token, $key) {
                $token->delete();
            });
            return array(
                'status' => true,
                'mensagem' => "Logout realizado com sucesso.",
                'dados' =>  []
            );
        } catch (Exception $ex) {
            return array(
                'status' => false,
                'mensagem' => "Erro ao realizar o logout.",
                'exception' => $ex->getMessage()
            );
        }
    }
}
