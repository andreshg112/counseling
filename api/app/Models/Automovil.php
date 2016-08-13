<?php

namespace App\Models;

class Automovil implements iVehiculo
{
    public function cobrar($entrada, $salida)
    {
        $dias_diferencia = $salida->day - $entrada->day;
        $minutos_dia = 24 * 60;
        $minutos_salida = $salida->hour * 60 + $salida->minute;
        $ultimo = $minutos_salida;
        $minutos_entrada = $entrada->hour * 60 + $entrada->minute;
        $inicial = $minutos_entrada;
        $valor = $tiempo_de_noche = 0;
        $noches_pagadas = [];
        $minutos_estadia = $entrada->diffInMinutes($salida);
        if ($minutos_estadia >= 3 && $minutos_estadia <= 9) {
            $valor = 2000;
        } else {
            for ($i = 0; $i <= $dias_diferencia; $i++) {
                $tiempo_de_dia = 0;
                for ($j = $inicial; $j < $minutos_dia; $j++) {
                    if ((7 * 60) == $j) {
                        //echo $tiempo_de_noche . " noche$i <br>";
                        $valor += min(ceil(($tiempo_de_noche) / 60) * 2000, 4000);
                        $tiempo_de_noche = 0;
                    }
                    if ($i == $dias_diferencia && $j == $ultimo) {
                        break;
                    }
                    if ((7 * 60) <= $j && $j < (18 * 60)) {
                        $tiempo_de_dia++;
                    } else {
                        $tiempo_de_noche++;
                    }
                }
                $inicial = 0;
                //echo $tiempo_de_dia . " dia$i <br>";
                $valor += min(ceil(($tiempo_de_dia - 9) / 60) * 2000, 12000);
                if ($tiempo_de_noche > 0 && $i >= $dias_diferencia) {
                    //echo $tiempo_de_noche . " noche$i <br>";
                    $valor += min(ceil(($tiempo_de_noche - 9) / 60) * 2000, 4000);
                    $tiempo_de_noche = 0;
                }
            }
        }
        return $valor;
    }
}
