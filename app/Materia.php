<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Materia extends Model
{
    protected $fillable = ['nombre', 'siglas'];

    public function ofertas()
    {
    	return $this->hasMany('App\Oferta');
    }
}
