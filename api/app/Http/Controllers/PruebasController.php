<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;

class PruebasController extends Controller
{
    public function cobrarEnParqueadero(Request $request)
    {
        $datos = $request->all();
        $entrada = Carbon::parse($datos['entrada']);
        $salida = Carbon::parse($datos['salida']);
        $dias_diferencia = $salida->day - $entrada->day;
        $puntos = 24 * 60;
        $minutos_salida = $salida->hour * 60 + $salida->minute;
        $ultimo = $minutos_salida;
        $minutos_entrada = $entrada->hour * 60 + $entrada->minute;
        $inicial = $minutos_entrada;
        $valor = 0;
        //Cobrar llegada
        if ((7 * 60 + 10) <= $minutos_entrada && $minutos_entrada < (18 * 60 + 10)) {
            $valor += 1400;
        } else {
            $valor += 2500;
        }
        for ($i = 0; $i <= $dias_diferencia; $i++) {
            for ($j = $inicial + 1; $j < $puntos; $j++) {
                switch ($j) {
                    case 7 * 60 + 10:
                        $valor += 1400;
                        break;
                    case 18 * 60 + 10:
                        $valor += 2500;
                        break;
                }
                if ($i == $dias_diferencia && $j == $ultimo) {
                    break;
                }
            }
            $inicial = 0;
        }
        print_r($valor);

        /*$datos = $request->all();
    $entrada = Carbon::parse($datos['entrada']);
    $salida = Carbon::parse($datos['salida']);
    $minutos_entrada = $entrada->hour * 60 + $entrada->minute;
    $minutos_salida = $salida->hour * 60 + $salida->minute;
    $valor = 0;
    $dias_diferencia = $salida->day - $entrada->day;
    $puntos = 24 * 60;
    $ultimo = $minutos_salida;
    $inicial = $minutos_entrada;
    //Cobrar llegada
    if ((7 * 60 + 10) <= $minutos_entrada && $minutos_entrada < (18 * 60 + 10)) {
    $valor += 1400;
    } else {
    $valor += 2500;
    }
    for ($i = 0; $i <= $dias_diferencia; $i++) {
    for ($j = $inicial + 1; $j < $puntos; $j++) {
    switch ($i) {
    case 7 * 60 + 10:
    $valor += 1400;
    break;

    case 18 * 60 + 10:
    $valor += 2500;
    break;
    }
    if ($i == $dias_diferencia && $j == $ultimo) {
    break;
    }
    }
    $inicial = 0;
    }
    print_r($valor);*/
    }

    /*if ($salida->day > $entrada->day) {
$max = 24 * 60;
} else {
$max = $minutos_salida;
}
for ($i = $minutos_entrada + 1; $i <= $minutos_salida; $i++) {
switch ($i) {
case 7 * 60 + 10:
$valor += 1400;
break;

case 18 * 60 + 10:
$valor += 2500;
break;
}
}*/
}

/*$datos = $request->all();
$entrada = Carbon::parse($datos['entrada']);
$salida = Carbon::parse($datos['salida']);
$dias_diferencia = $salida->day - $entrada->day;
$puntos = 24 * 60;
$minutos_salida = $salida->hour * 60 + $salida->minute;
$ultimo = $minutos_salida;
$inicial = 2;
for ($i = 0; $i <= $dias_diferencia; $i++) {
for ($j = $inicial; $j < $puntos; $j++) {
echo $j . ' ';
if ($j == 2) {
echo 'dos ';
}
if ($i == $dias_diferencia && $j == $ultimo) {
break;
}
}
$inicial = 0;
}*/
