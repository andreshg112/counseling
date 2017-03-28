<?php

namespace App\Models;

interface iVehiculo
{
    public function cobrar($entrada, $salida);
}
