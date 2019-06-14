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
Route::put('/cambiarRol/{idUsuario}/{rolIndex}','usuariocontroller@edicionRol');
Route::get('/Ofertas','OfertaController@showAll');
Route::get('/obtenerInscripciones/{idUsuario}','InscripcionController@obtenerInscripciones');
Route::get('/obtenerDictadas/{idUsuario}','InscripcionController@obtenerDictadas');
Route::get('/obtenerAuxiliadas/{idUsuario}','InscripcionController@obtenerAuxiliadas');
Route::get('/sesiones/{idGrupo}','SesionController@showByGrupoId');
Route::get('/sesionAbierta/{grupoId}','SesionController@obtenerSesionAbiertaPorGrupo');
Route::get('/entregas/{productoId}','EntregaController@getAllByProducto');
Route::get('/entrega/{Id}','EntregaController@getEntregaById');
Route::get('/usuarioNombres/{id}','usuariocontroller@getNames');
Route::get('/basic/{id}','usuariocontroller@getBasicInfo');
Route::get('/inscritos/{idGrupo}','InscripcionController@obtenerInscritos');
Route::get('/reporteInscritos/{idGrupo}','InscripcionController@obtenerInscritosYEntregas');
Route::get('/asistenciasHoy/{sesionId}','AsistenciaController@getTodaysAsistence');
Route::get('/asistenciasHoyCompleto/{sesionId}','AsistenciaController@getAllAsistenceBySesion');
Route::post('/subirArchivo/{id}','ArchivoController@guardar');
Route::get('/descargar/{id}','ArchivoController@descargar');

Route::resource('Materia', 'MateriaController');
Route::resource('Docente', 'DocenteController');
Route::resource('Oferta', 'OfertaController');
Route::resource('Inscripcion', 'InscripcionController');
Route::resource('Sesion', 'SesionController');
Route::resource('Producto', 'ProductoController');
Route::resource('Entrega', 'EntregaController');
Route::resource('Asistencia', 'AsistenciaController');
Route::resource('Archivo', 'ArchivoController');