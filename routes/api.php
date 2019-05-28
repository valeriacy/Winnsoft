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
Route::get('/obtenerDictadas/{idUsuario}','InscripcionController@obtenerDictadas');
Route::get('/sesiones/{idGrupo}','SesionController@showByGrupoId');
Route::get('/entregas/{productoId}','EntregaController@getAllByProducto');
Route::get('/usuarioNombres/{id}','usuariocontroller@getNames');

Route::resource('Materia', 'MateriaController');
Route::resource('Docente', 'DocenteController');
Route::resource('Oferta', 'OfertaController');
Route::resource('Inscripcion', 'InscripcionController');
Route::resource('Sesion', 'SesionController');
Route::resource('Producto', 'ProductoController');
Route::resource('Entrega', 'EntregaController');