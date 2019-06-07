<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Inscripcion;
use App\Materia;
use App\Oferta;
use App\Http\Controllers\OfertaController;
use App\usuario;

class InscripcionController extends Controller
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
        $inscripcion = new Inscripcion;
        $inscripcion->oferta_id = $request->ofertaId;
        $inscripcion->usuario_id = $request->usuarioId;
        $inscripcion->save();
    }

    public function obtenerInscritos($idgrupo){
        $inscripciones = Inscripcion::where('oferta_id', '=', $idgrupo)->get();
        $numeroOferta = Oferta::find($idgrupo)->pluck('grupo')->first();
        $inscritos = array();
        foreach ($inscripciones as $inscripcion) {
            $inscrito = usuario::find($inscripcion->usuario_id);
            unset($inscrito->rol);
            unset($inscrito->nombre_usuario);
            unset($inscrito->contra);
            unset($inscrito->created_at);
            unset($inscrito->updated_at);
            $inscrito->inscripcionId = $inscripcion->id;
            array_push($inscritos, $inscrito);
        }
        return $inscritos;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function obtenerInscripciones($idUsuario){
        $idOfertas = Inscripcion::where('usuario_id' ,'=' ,$idUsuario)->pluck('oferta_id')->toArray();
        $ofertaController = new OfertaController();

        $response = array();
        foreach ($idOfertas as $idOferta) {
            $oferta = $ofertaController->getOferta($idOferta);
            array_push($response, $oferta);
        }
        return $response;
    }

    public function obtenerDictadas($idUsuario){
        $idOfertas = Oferta::where('docente_id' ,'=' ,$idUsuario)->pluck('id')->toArray();
        $ofertaController = new OfertaController();

        $response = array();
        foreach ($idOfertas as $idOferta) {
            $oferta = $ofertaController->getOferta($idOferta);
            array_push($response, $oferta);
        }
        return $response;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
