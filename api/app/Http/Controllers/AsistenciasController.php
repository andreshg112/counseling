<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Models\Asistencia;
use \stdClass;

class AsistenciasController extends Controller
{
    
    public function store(Request $request, $horario_id)
    {
        $respuesta = [];
        if (!is_array($request->all())) {
            $respuesta['result'] = false;
            $respuesta['mensaje'] = 'Los datos enviados no tienen el formato correcto.';
        } else {
            $recibido = (object) $request->all();
            $rules = [
            'horario_id'  => 'required|exists:horarios,id|unique_with:asistencias,alumno_id,horario_id=horario_id,fecha = fecha',
            'alumno_id'  => 'required|exists:users,id,tipo_usuario,alumno',
            'temas_tutoriados'  => 'required|string',
            'fecha'  => 'required|date',
            ];
            try {
                $validator = \Validator::make($request->all(), $rules);
                if ($validator->fails()) {
                    $respuesta['result'] = false;
                    $respuesta['validator'] = $validator->errors()->all();
                    $respuesta['mensaje'] = '¡Error!';
                } else {
                    $instancia = new Asistencia($request->all());
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
    
}