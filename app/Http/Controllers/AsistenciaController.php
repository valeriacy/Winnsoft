<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Asistencia;

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
        $asistencia->fecha = $request->fecha;
        $asistencia->asistio = $request->asistio;
        $asistencia->descripcion = $request->descripcion;
        $asistencia->observacion = $request->observacion;
        $asistencia->sesion_Id = $request->sesionId;
        $asistencia->save();
    }

    public function storeAll(Request $request){
        foreach ($request->asistencias as $asistencia) {
            $model = new Asistencia();

            $model->inscripcion_id = $asistencia->inscripcionId;
            $model->fecha = $request->fecha;
            $model->asistio = $asistencia->asistio;
            $model->descripcion = $asistencia->descripcion;
            $model->observacion = $asistencia->observacion;
            $model->sesion_Id = $request->sesionId;
            $model->save();
        }
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
