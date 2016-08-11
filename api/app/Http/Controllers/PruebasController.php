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
        $tipo_vehiculo = $datos['tipo_vehiculo'];
        $valor = 0;
        if ($tipo_vehiculo == 'motocicleta') {
            $valor = cobrarMotocicleta($entrada, $salida);
        } elseif ($tipo_vehiculo == 'automovil') {
            $valor = cobrarAutomovil($entrada, $salida);
        }
        print_r($valor);
    }

}

function cobrarMotocicleta($entrada, $salida)
{
    $dias_diferencia = $salida->day - $entrada->day;
    $minutos_dia = 24 * 60;
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
        for ($j = $inicial + 1; $j < $minutos_dia; $j++) {
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
    return $valor;
}

function cobrarAutomovil($entrada, $salida)
{
    $dias_diferencia = $salida->day - $entrada->day;
    $minutos_dia = 24 * 60;
    $minutos_salida = $salida->hour * 60 + $salida->minute;
    $ultimo = $minutos_salida;
    $minutos_entrada = $entrada->hour * 60 + $entrada->minute;
    $inicial = $minutos_entrada;
    $valor = $tiempo_de_noche = 0;
    $noches_pagadas = [];
    for ($i = 0; $i <= $dias_diferencia; $i++) {
        $tiempo_de_dia = 0;
        for ($j = $inicial; $j < $minutos_dia; $j++) {
            if ((7 * 60 + 9) == $j) {
                //echo $tiempo_de_noche . " noche$i <br>";
                $valor += min(ceil(($tiempo_de_noche) / 60) * 2000, 4000);
                $tiempo_de_noche = 0;
            }
            if ($i == $dias_diferencia && $j == $ultimo) {
                break;
            }
            if ((7 * 60 + 9) <= $j && $j < (18 * 60 + 9)) {
                $tiempo_de_dia++;
            } else {
                $tiempo_de_noche++;
            }
        }
        $inicial = 0;
        //echo $tiempo_de_dia . " dia$i <br>";
        $valor += min(ceil(($tiempo_de_dia) / 60) * 2000, 12000);
        if ($tiempo_de_noche > 0 && $i >= $dias_diferencia) {
            //echo $tiempo_de_noche . " noche$i <br>";
            $valor += min(ceil(($tiempo_de_noche) / 60) * 2000, 4000);
            $tiempo_de_noche = 0;
        }
    }
    //echo $entrada->diffInMinutes($salida) . " dif<br>";
    return $valor;
}
