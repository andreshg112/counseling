<?php

namespace App\Http\Controllers;

use App\Models\FactoryVehiculo;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PruebasController extends Controller
{
    public function cobrarEnParqueadero(Request $request)
    {
        $respuesta = [];
        if (!is_array($request->all())) {
            $respuesta['result'] = false;
            $respuesta['mensaje'] = 'Los datos enviados no tienen el formato correcto.';
        } else {
            $rules = [
                'entrada' => 'required|date',
                'salida' => 'required|date',
                'id_vehiculo' => 'required|in:1,2,3,4,5',
            ];
            try {
                $validator = \Validator::make($request->all(), $rules);
                if ($validator->fails()) {
                    $respuesta['result'] = false;
                    $respuesta['validator'] = $validator->errors()->all();
                    $respuesta['mensaje'] = '¡Error!';
                } else {
                    $datos = $request->all();
                    $entrada = Carbon::parse($datos['entrada']);
                    $salida = Carbon::parse($datos['salida']);
                    if ($entrada->diffInMinutes($salida) < 3) {
                        $respuesta['result'] = 0;
                    } else {
                        $id_vehiculo = $datos['id_vehiculo'];
                        $vehiculo = FactoryVehiculo::getVehiculo($id_vehiculo);
                        $respuesta['result'] = $vehiculo->cobrar($entrada, $salida);
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
