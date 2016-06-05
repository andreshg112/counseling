<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Models\Tutor;
use \stdClass;

class TutoresController extends Controller
{
    
    public function destroy($id)
    {
        $instancia = Tutor::find($id);
        $respuesta = new stdClass();
        if ($instancia) {
            $respuesta->result = $instancia->delete();
            if ($instancia->trashed()) {
                $respuesta->mensaje = "Eliminado correctamente.";
                $respuesta->eliminado = $instancia;
            } else {
                $respuesta->mensaje = "Error tratando de eliminar.";
            }
        } else {
            $respuesta->mensaje = "No se encuentra registrado.";
        }
        return (array) $respuesta;
    }
    
    public function index()
    {
        return Tutor::all();
    }
    
    public function store(Request $request)
    {
        $respuesta = [];
        if (!is_array($request->all())) {
            $respuesta['result'] = false;
            $respuesta['mensaje'] = 'Los datos enviados no tienen el formato correcto.';
        } else {
            // Creamos las reglas de validación
            $rules = [
            'primer_nombre'      => 'required|string',
            'primer_apellido'  => 'required|string'
            ];
            
            try {
                // Ejecutamos el validador y en caso de que falle devolvemos la respuesta
                $validator = \Validator::make($request->all(), $rules);
                if ($validator->fails()) {
                    $respuesta['result'] = false;
                    $respuesta['validator'] = $validator->errors()->all();
                    $respuesta['mensaje'] = '¡Error!';
                } else {
                    $instancia = new Tutor($request->all());
                    $respuesta['result'] = $instancia->save();
                    if ($respuesta['result']) {
                        $respuesta['mensaje'] = "Registrado correctamente.";
                        $respuesta['result'] = $instancia;
                    } else {
                        $respuesta['mensaje'] = "No se pudo registrar.";
                    }
                }
            } catch (Exception $e) {
                $respuesta['result'] = false;
                $respuesta['mensaje'] = "Error: $e";
            }
            
        }
        return $respuesta;
    }
    
    public function update(Request $request, $id)
    {
        $tutor = Tutor::find($id);
        $tutor->update($request->all());
        return ['updated' => true];
    }
    
    public function show($id)
    {
        return Tutor::findOrFail($id);
    }
    
}