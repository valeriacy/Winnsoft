<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::resource('usuario', 'usuariocontroller');
Route::post('/login','usuariocontroller@validar');
Route::get('/verificarnombreusuario/{nombreUsuario}','usuariocontroller@verificarNombreUsuario');
Route::get('/Ofertas','OfertaController@showAll');
Route::get('/obtenerInscripciones/{idUsuario}','InscripcionController@obtenerInscripciones');
Route::get('/sesiones/{idGrupo}','SesionController@showByGrupoId');

Route::resource('Materia', 'Materiacontroller');
Route::resource('Docente', 'Docentecontroller');
Route::resource('Oferta', 'Ofertacontroller');
Route::resource('Inscripcion', 'InscripcionController');
Route::resource('Sesion', 'SesionController');
Route::resource('Producto', 'ProductoController');
Route::resource('Entrega', 'EntregaController');