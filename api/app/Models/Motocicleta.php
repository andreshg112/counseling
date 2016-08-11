<?php

namespace App\Models;

/**
 *Aplica también para Bicicletas
 */
class Motocicleta implements iVehiculo
{
    protected $cascos = 0;

    public function __construct($cascos = 0)
    {
        $this->cascos = $cascos;
    }

    public function cobrar($entrada, $salida)
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
            $valor += 1400 + $this->cascos * 400;
        } else {
            $valor += 2500 + $this->cascos * 400;
        }
        for ($i = 0; $i <= $dias_diferencia; $i++) {
            for ($j = $inicial + 1; $j < $minutos_dia; $j++) {
                switch ($j) {
                    case 7 * 60 + 10:
                        $valor += 1400 + $this->cascos * 400;
                        break;
                    case 18 * 60 + 10:
                        $valor += 2500 + $this->cascos * 400;
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
}
