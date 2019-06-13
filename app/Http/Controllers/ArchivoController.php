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
        $validator = Validator::make($request->file(), [
            'file' => 'required|image|max:500000',
        ]);
        if ($validator->fails()) {
            $errors = [];
            foreach ($validator->messages()->all() as $error) {
                array_push($errors, $error);
            }
            return response()->json(['errors' => $errors, 'status' => 400], 400);
        }
        $file = Archivo::create([
            'nombre_archivo' => $request->file('file')->getClientOriginalName(),
            'tipo' => $request->file('file')->extension(),
            'tamanho' => $request->file('file')->getClientSize(),
            'entrega_id' => $id
        ]);
        $request->file('file')->move(__DIR__ . '/../../../uploads/', $file->id . '.' . $file->tipo);
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
