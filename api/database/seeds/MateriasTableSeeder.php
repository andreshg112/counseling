<?php

use Illuminate\Database\Seeder;

class MateriasTableSeeder extends Seeder
{
    /**
    * Run the database seeds.
    *
    * @return void
    */
    public function run()
    {
        //
        factory('App\Models\Materia', 10)->create();
    }
}