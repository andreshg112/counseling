<?php

namespace App\Http\Controllers;

use App\Models\FactoryVehiculo;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PruebasController extends Controller
{
    public function cobrarEnParqueadero(Request $request)
    {
        $datos = $request->all();
        $entrada = Carbon::parse($datos['entrada']);
        $salida = Carbon::parse($datos['salida']);
        $id_vehiculo = $datos['id_vehiculo'];
        $valor = 0;
        $vehiculo = FactoryVehiculo::getVehiculo($id_vehiculo);
        $valor = $vehiculo->cobrar($entrada, $salida);
        return $valor;
    }

}
