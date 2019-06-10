<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Asistencia;
use App\Inscripcion;
use App\usuario;
use App\Http\Controllers\InscripcionController;

class AsistenciaController extends Controller
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
        $asistencia = new Asistencia();
        $asistencia->inscripcion_id = $request->inscripcionId;
        $asistencia->fecha = date('Y-m-d');
        $asistencia->asistio = $request->asistio;
        $asistencia->descripcion = $request->descripcion;
        $asistencia->observacion = $request->observacion;
        $asistencia->sesion_Id = $request->sesionId;
        $asistencia->save();
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

    public function getTodaysAsistence($sesionId){

        return sizeof(Asistencia::whereDate('fecha', '=', date('Y-m-d'))->where("sesion_id", $sesionId)->get());
    }

    public function getAllAsistenceBySesion($sesionId){
        $asistencias = Asistencia::where("sesion_id", $sesionId)->get();
        $inscripcionController = new InscripcionController();
        $inscritos = array();
        $asistenciasRes = array();
        foreach($asistencias as $asistencia){
           $inscripcion = Inscripcion::find($asistencia->inscripcion_id);
           $inscrito = $inscripcionController->obtenerInscritoPorInscripcionId($inscripcion);
           array_push($inscritos, $inscrito);
           array_push($asistenciasRes, $asistencia);
        }
        return response()->json([
            'inscritos' => $inscritos,
            'asistencias' => $asistencias
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
