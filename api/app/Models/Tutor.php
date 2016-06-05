<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tutor extends Model
{
    use SoftDeletes;
    protected $table = 'tutores';
    protected $fillable = ['primer_nombre', 'segundo_nombre', 'primer_apellido', 'segundo_apellido'];
}