<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Archivo;
use Validator;
use Illuminate\Support\Facades\Storage;

class ArchivoController extends Controller
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
        //
    }

    public function guardar(Request $request, $id){
        $file = Archivo::create([
            'nombre_archivo' => $request->file('file')->getClientOriginalName(),
            'tipo' => $request->file('file')->extension(),
            'tamanho' => $request->file('file')->getClientSize(),
            'entrega_id' => $id,
            'docente_upload' => false
        ]);
        $path = $request->file('file')->storeAs(
            'uploads', $file->id . '-'. $id .'.' . $file->tipo
        );

        return $path;
    }

    public function guardarDocente(Request $request, $id){
        $file = Archivo::create([
            'nombre_archivo' => $request->file('file')->getClientOriginalName(),
            'tipo' => $request->file('file')->extension(),
            'tamanho' => $request->file('file')->getClientSize(),
            'entrega_id' => $id,
            'docente_upload' => true
        ]);
        $path = $request->file('file')->storeAs(
            'uploads', $file->id . '-'. $id .'.' . $file->tipo
        );

        return $path;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Archivo::where("entrega_id", $id)->get();
    }

    public function descargar($id){
        $archivo = Archivo::find($id);
        $entregaId = $archivo->entrega_id;
        $tipo = $archivo->tipo;
        $nombreUpload = $id ."-". $entregaId . "." .$tipo;
        return response()->download(base_path('storage/app/uploads/'.$nombreUpload), $archivo->nombre_archivo);
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
        //
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
}
