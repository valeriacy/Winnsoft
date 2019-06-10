<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Sesion;
use App\Producto;
use App\Entrega;
use App\Http\Controllers\ProductoController;

class SesionController extends Controller
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
        $grupoId = $request->grupoId;
        $this->cerrarSesionAbierta($grupoId);
        $sesion = new Sesion();
        
        $sesion->grupo_id = $grupoId;
        $sesion->cerrado = false;
        $maxValue = Sesion::where("grupo_Id", $request->grupoId)->max('numero');
        $sesion->numero = $maxValue+1;

        $sesion->save();
    }

    public function obtenerSesionAbiertaPorGrupo($grupoId){
        return Sesion::where('grupo_id', $grupoId)->where('cerrado', false)->get()->first();
    }

    public function cerrarSesionAbierta($idGrupo){
        $sesiones = $this->showByGrupoId($idGrupo);
        foreach ($sesiones as $sesion) {
            if(!$sesion->cerrado){
                $sesion->cerrado = true;
                Sesion::where('id', $sesion->id)->update(['cerrado' => true]);
            }
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
        return Sesion::find($id);
    }

    public function showByGrupoId($idGrupo)
    {
        $sesionIds = Sesion::where('grupo_id' ,'=' ,$idGrupo)->pluck('id')->toArray();
        $sesions = [];
        foreach ($sesionIds as $sesionId) {
            array_push($sesions, $this->getSesionById($sesionId));
        }
        return $sesions;
    }

    public function getSesionById($id)
    {
        $sesion = Sesion::find($id);
        $attributes = $sesion->getAttributes();
        $sesionId = $attributes['id'];
        $productosIds = Producto::where('sesion_id' ,'=' ,$sesionId)->pluck('id')->toArray();

        $productoController = new ProductoController();
        $productos = array();
        foreach ($productosIds as $id) {
            array_push($productos, $productoController->getProductoById($id));
        }

        $response = new \stdClass();
        $response->id = $attributes['id'];
        $response->numero = $attributes['numero'];
        $response->cerrado = $attributes['cerrado'];
        $response->grupoId = $attributes['grupo_id'];
        $response->productos = $productos;

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
