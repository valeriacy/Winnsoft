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
            'file' => 'required|mimes:zip,rar|max:5000000',
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
        //$path = $request->file('file')->store('uploads');
        $path = $request->file('file')->storeAs(
            'uploads', $file->id . '-'. $id .'.' . $file->tipo
        );

        return $path;
        //$request->file('file')->move(__DIR__ . '/../../../uploads/', $file->id . '-'. $id .'.' . $file->tipo);
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
        //return Storage::download($nombreUpload);
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
