<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Materia extends Model
{
    use SoftDeletes;
    
    protected $table = 'materias';
    protected $fillable = ['codigo', 'nombre', 'creditos'];
}