<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Inscripcion extends Model
{
    protected $fillable = ['oferta_id', 'usuario_id'];

    public function oferta()
    {
    	return $this->belongsTo('App\Oferta');
    }

    public function usuario()
    {
    	return $this->belongsTo('App\usuario');
    }
}
