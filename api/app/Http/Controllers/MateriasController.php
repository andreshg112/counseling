<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Materia;

class MateriasController extends Controller
{
    
    public function destroy($id)
    {
        Materia::destroy($id);
        return ['deleted' => true];
    }
    
    public function index()
    {
        return Materia::all();
    }
    
    public function store(Request $request)
    {
        if (!is_array($request->all())) {
            return ['error' => 'request must be an array'];
        }
        // Creamos las reglas de validación
        $rules = [
        'codigo'      => 'required|unique:materias',
        'nombre'     => 'required',
        'creditos'  => 'required|integer'
        ];
        
        try {
            // Ejecutamos el validador y en caso de que falle devolvemos la respuesta
            $validator = \Validator::make($request->all(), $rules);
            if ($validator->fails()) {
                return [
                'created' => false,
                'errors'  => $validator->errors()->all()
                ];
            }
            
            Materia::create($request->all());
            return ['created' => true];
        } catch (Exception $e) {
            \Log::info('Error creating materia: '.$e);
            return \Response::json(['created' => false], 500);
        }
    }
    
    public function update(Request $request, $id)
    {
        $materia = Materia::find($id);
        $materia->update($request->all());
        return ['updated' => true];
    }
    
    public function show($id)
    {
        return Materia::findOrFail($id);
    }
    
}