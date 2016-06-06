<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
    * Run the database seeds.
    *
    * @return void
    */
    public function run()
    {
        DB::table('users')->insert([
        'email' => 'administrador@unicesar.edu.co',
        'password' => '1234',
        'primer_nombre' => 'Juan',
        'primer_apellido' => 'Díaz',
        'tipo_usuario' => 'administrador',
        'genero' => 'masculino',
        'created_at' => new DateTime(),
        'updated_at' => new DateTime(),
        ]);
    }
}