<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Entrega extends Model
{
    protected $fillable = ['fecha', 
                            'descripcion', 
                            'nombre_archivo',
                            'tamanho',
                            'tipo',
                            'usuario_id',
                            'producto_id'];
}
