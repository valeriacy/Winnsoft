<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class usuario extends Model
{
    protected $fillable = ['nombre', 'apellido', 'rol', 'nombre_usuario', 'contra'];
}
