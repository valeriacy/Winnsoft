<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    protected $fillable = ['numero',
                           'cerrado',
                           'sesion_id'];
}
