<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::group(['middleware' => 'cors'], function() {
    Route::resource('materias', 'MateriasController', ['except' => ['create', 'edit']]);
    Route::get('tutores', 'UsersController@get_tutores');
    Route::resource('horarios', 'HorariosController', ['except' => ['create', 'edit']]);
    Route::resource('users', 'UsersController', ['only' => ['store']]);
    Route::post('login', 'UsersController@login');
});