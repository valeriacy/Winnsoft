<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Entrega;
use App\Producto;
use App\Sesion;
use App\Oferta;
use App\usuario;
use App\Http\Controllers\ArchivoController;

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
        $entrega->usuario_id = $request->usuarioId;
        $entrega->producto_id = $request->productoId;
        $entrega ->save();

        return $entrega->id;
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
        $entrega = Entrega::find($id);

        $productoId=$entrega->producto_id;
        $numeroProducto = Producto::where('id',$productoId)->value('numero');
        $sesionId = Producto::where('id',$productoId)->value('sesion_id');
        $numeroSesion = Sesion::where('id',$sesionId)->value('numero');
        $ofertaId = Sesion::where('id', $sesionId)->value('grupo_id');
        $grupo = Oferta::where('id',$ofertaId)->value('grupo');
        $archivoController = new ArchivoController();

        $entrega->numeroProducto = $numeroProducto;
        $entrega->numeroSesion = $numeroSesion;
        $entrega->grupo = $grupo;
        $entrega->archivos = $archivoController->show($id);
        unset($entrega->created_at);
        unset($entrega->updated_at);

        return $entrega;
    }

    public function getAllByProducto($productId){
        $entregas = Entrega::where('producto_id' ,$productId)->get();
        $response = array();

        foreach ($entregas as $entrega) {
            $attributes = $entrega->getAttributes();

            $usuario = usuario::find($attributes["usuario_id"]);
            $attributesUsuario = $usuario->getAttributes();

            $element = new \stdClass();
            $element->nombre = $attributesUsuario['nombre'];
            $element->apellido = $attributesUsuario['apellido'];
            $element->entregaId = $attributes["id"];

            array_push($response, $element);
        }

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
