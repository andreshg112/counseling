<?php

namespace App\Models;

abstract class FactoryVehiculo
{
    public static function getVehiculo($id_vehiculo)
    {
        switch ($id_vehiculo) {
            case 1:
                return new Automovil();
                break;
            case 2:
                return new Motocicleta();
                break;
            case 3:
            //Se les cobra a las bicicletas igual que a las motocicletas.
                return new Motocicleta();
                break;
            case 4:
            //Un casco.
                return new Motocicleta(1);
                break;
            case 5:
            //Dos cascos.
                return new Motocicleta(2);
                break;
        }
    }
}
