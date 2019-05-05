<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sesion extends Model
{
    protected $fillable = ['numero',
                           'cerrado',
                           'grupo_id'];
}
