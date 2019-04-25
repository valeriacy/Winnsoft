<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Oferta extends Model
{
    protected $fillable = ['grupo', 'materia_id', 'docente_id'];

    public function materia()
    {
    	return $this->belongsTo('App\Materia');
    }

    public function docente()
    {
    	return $this->belongsTo('App\Docente');
    }
}
