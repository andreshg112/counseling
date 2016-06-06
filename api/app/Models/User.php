<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
    use SoftDeletes;
    /**
    * The attributes that are mass assignable.
    *
    * @var array
    */
    protected $fillable = [
    'email', 'password', 'primer_nombre', 'segundo_nombre', 'primer_apellido', 'segundo_apellido', 'tipo_usuario',
    ];
    
    /**
    * The attributes that should be hidden for arrays.
    *
    * @var array
    */
    protected $hidden = [
    'password', 'remember_token',
    ];
}