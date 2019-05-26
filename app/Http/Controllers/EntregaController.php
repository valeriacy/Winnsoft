<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Entrega;

class EntregaController extends Controller
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
        date_default_timezone_set('America/Caracas');
        $date = date('Y/m/d h:i:s', time());

        $entrega = new Entrega;
        $entrega->fecha = $date;
        $entrega->descripcion = $request->descripcion;
        $entrega->nombre_archivo = $request->nombreArchivo;
        $entrega->tamanho = $request->tamanho;
        $entrega->tipo = $request->tipo;
        $entrega->usuario_id = $request->usuarioId;
        $entrega->producto_id = $request->productoId;
        $entrega ->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $this->getEntregaById($id);
    }

    public function getEntregaById($id)
    {
        return Entrega::find($id);
    }

    public function getAllByProducto($productId){
        $entregas = Entrega::where('producto_id' ,$productId)->get();
        return $entregas;
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
