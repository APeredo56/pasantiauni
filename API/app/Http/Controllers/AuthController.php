<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credenciales = [
            'email' => ['required'],
            'password' => ['required'],
        ];
        $validador = Validator::make($request->all(), $credenciales);
        if ($validador->fails()) {
            return response()->json($validador->messages(), 422);
        }
        if (Auth::guard('web')->attempt($request->all())) {
            $request->session()->regenerate();
            return response()->json(['message' => __('Autenticado correctamente')]);
        }
        return response()->json(['message' => __('Credenciales invalidas')], 401);
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        if ($user) {
            $user->tokens()->delete();
        }

        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        $request->session()->flush();

        return response()->json(['message' => __('Sesion cerrada correctamente')]);
    }
}
