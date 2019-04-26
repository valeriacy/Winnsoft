<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Docente extends Model
{
    protected $fillable = ['nombre'];

    public function ofertas()
    {
    	return $this->hasMany('App\Oferta');
    }
}
