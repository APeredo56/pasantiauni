<?php

namespace App\Http\Controllers;

use App\Enums\RolesUsuario;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class UserController
{
    public function getReglas($userId = 0): array
    {
        return [
            'name' => 'required|string',
            'email' => ['required', Rule::unique('users')->ignore($userId)]
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return User::with('roles')->get();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $reglas = $this->getReglas();
        //$reglas['password'] = 'required|min:8|confirmed|regex:/[A-Z]/|regex:/[a-z]/|regex:/[0-9]/|regex:/[@$!%*?&]/';
        $reglas['password'] = 'required|string|min:8';

        $validador = Validator::make($request->all(), $reglas);
        if ($validador->fails()) {
            if ($validador->errors()->has('email') && $validador->errors()->first('email') === trans('validation.unique', ['attribute' => 'email'])) {
                return response()->json(['message' => 'El correo ya está en uso.'], 422);
            }
            return response()->json($validador->errors(), 422);
        }

        $request['password'] = bcrypt($request['password']);
        return User::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(User $usuario)
    {
        return $usuario->load('roles');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $usuario)
    {

        $validador = Validator::make($request->all(), $this->getReglas($usuario->id));
        if ($validador->fails()) {
            return response()->json($validador->errors(), 422);
        }

        $usuario->update($request->all());
        return $usuario;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $usuario)
    {
        $usuario->delete();
        return response()->json(['mensaje' => 'Usuario eliminado']);
    }

    public function asignarRoles(Request $request, User $usuario)
    {
        $reglas = [
            'roles' => 'required|array',
            'roles.*' => ['required', new Enum(RolesUsuario::class)]
        ];
        $validador = Validator::make($request->all(), $reglas);
        if ($validador->fails()) {
            return response()->json($validador->errors(), 422);
        }
        $usuario->syncRoles($request->roles);
        return response()->json(['mensaje' => 'Roles asignados']);
    }
}
