<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class usuario extends Model
{
    protected $fillable = ['nombre', 'apellido', 'rol', 'nombre_usuario', 'contra'];

    public function inscripciones()
    {
    	return $this->hasMany('App\Inscripcion');
    }
}
