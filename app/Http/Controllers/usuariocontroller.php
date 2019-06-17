<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\usuario;

class usuariocontroller extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $usuario = new usuario;
        $usuario->nombre = $request->name;
        $usuario->contra = $request->password;
        $usuario->nombre_usuario = $request->username;
        $usuario->apellido = $request->lastname;
        $usuario->rol = $request->rol;
        $usuario->save();
    }

    public function getAllDocentes(){
        return usuario::where("rol", "docente")->get();
    }

    public function getAllAuxiliar(){
        return usuario::where("rol", "auxiliar")->get();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return usuario::find($id);
    }

    public function showAll()
    {
        return usuario::all();
    }

    public function getNames($id)
    {
        $usuario=usuario::find($id);
        $attributes = $usuario->getAttributes();

        return response()->json([
            'nombre' => $attributes['nombre'],
            'apellido' => $attributes['apellido']
        ]);;
    }

    public function getBasicInfo($id){
        $usuario=usuario::find($id);
        return response()->json([
            'id' => $usuario->id,
            'nombre' => $usuario->nombre,
            'apellido' => $usuario->apellido,
            'rol' => $usuario->rol,
            'nombre_usuario' => $usuario->nombre_usuario
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $usuario = usuario::find($id);
        $usuario->nombre = $request->nombre;
        $usuario->apellido = $request->apellido;
        $usuario->contra = $request->contra;
        $usuario->rol = $request->rol;
        $usuario->save();
        return usuario::all();
    }

    public function edicionRol($usuarioId, $rolIndex){
        $roles = array(
            1 => "estudiante",
            2 => "docente",
            3 => "auxiliar");
        
        $usuario = usuario::find($usuarioId);
        $usuario->rol = $roles[$rolIndex];
        $usuario->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function validar(Request $request){
        $nombreUS = $request->nombre;
        $verificado = usuario::where("nombre_usuario", $nombreUS)->get();
        return $verificado;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  string  $nombreUsuario
     * @return \Illuminate\Http\Response
     */
    public function verificarNombreUsuario($nombreUsuario)
    {
        $usuario = usuario::where("nombre_usuario", $nombreUsuario)->get();
        return $usuario;
    }
}
