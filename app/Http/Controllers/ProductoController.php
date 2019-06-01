<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Producto;
use App\Entrega;
use App\Http\Controllers\EntregaController;

class ProductoController extends Controller
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
        $producto = new Producto();
        $maxValue = Producto::where("sesion_Id", $request->sesionId)->max('numero');

        $producto->sesion_id = $request->sesionId;
        $producto->cerrado = false;
        $producto->numero = $maxValue+1;
        $producto->fecha_caducidad = $request->fecha;
        $producto->descripcion = $request->descripcion;

        $producto->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $this->getProductoById($id);
    }

    public function getProductoById($id)
    {
        $producto = Producto::find($id); 
        $attributes = $producto->getAttributes();
        $productoId = $attributes['id'];
        $entregaIds = Entrega::where('producto_id' ,'=' ,$productoId)->pluck('id')->toArray();
        $entregaController = new EntregaController();
        $entregas = array();
        foreach ($entregaIds as $id) {
            array_push($entregas, $entregaController->getEntregaById($id));
        }

        $response = new \stdClass();
        $response->id=$attributes['id'];
        $response->numero=$attributes['numero'];
        $response->cerrado=$attributes['cerrado'];
        $response->fechaCaducidad=$attributes['fecha_caducidad'];
        $response->descripcion=$attributes['descripcion'];
        $response->entregas=$entregas;

        return $response;
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
