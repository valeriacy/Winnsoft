<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Archivo extends Model
{
    protected $fillable = ['nombre_archivo', 'tamanho', 'tipo', 'entrega_id'];
}
