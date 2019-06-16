<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Oferta;
use App\Docente;
use App\Materia;
use App\usuario;

class OfertaController extends Controller
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
        $oferta = new Oferta;
        $oferta->grupo = $request->grupo;
        $oferta->materia_id = $request->materiaId;
        $oferta->docente_id = $request->docenteId;
        $oferta->auxiliar_id = $request->auxiliarId;
        $oferta->hora = $request->horaInicio;
        $oferta->dia = $request->dia;
        $oferta->codigo = $this->generarCodigo();
        $oferta->save();
    }

    public function generarCodigo(){
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; 
        $randomString = ''; 
    
        for ($i = 0; $i < 6; $i++) { 
            $index = rand(0, strlen($characters) - 1); 
            $randomString .= $characters[$index]; 
        } 
    
        return $randomString; 
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $this->getOferta($id);
    }

    public function getOferta($id){
        $oferta = Oferta::find($id);
        $attributes = $oferta->getAttributes();
        $docenteId = $attributes['docente_id'];
        $auxiliarId = $attributes['auxiliar_id'];
        $materiaId = $attributes['materia_id'];

        $docente = usuario::find($docenteId);
        $auxiliar = usuario::find($auxiliarId);
        $materia = Materia::find($materiaId);
        return [$oferta, $docente, $materia, $auxiliar];
    }

    public function getMaxGrupoFromMateria($idMateria){
        return Oferta::where("materia_id", $idMateria)->max('grupo');
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

    /**
     * Remove the specified resource from storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function showAll()
    {
        $ids = Oferta::where('id' ,'>' ,0)->pluck('id')->toArray();
        $response = array();
        foreach ($ids as $id) {
            array_push($response, $this->getOferta($id));
        }
        return $response;
    }
}
