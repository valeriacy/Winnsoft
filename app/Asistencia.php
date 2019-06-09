<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Asistencia extends Model
{
    protected $fillable = ['inscripcion_id', 
                            'fecha',
                            'asistio',
                            'descripcion',
                            'observacion',
                            'sesion_id'
                            ];
}
