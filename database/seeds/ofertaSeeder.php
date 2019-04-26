<?php

use Illuminate\Database\Seeder;

class ofertaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        date_default_timezone_set('Australia/Melbourne');
        $date = date('Y/m/d h:i:s', time());

        \DB::table('materias')->insert([
            'id' => 1,
        	'nombre' => "Introduccion a la Programacion",
        	'siglas' => "IP1",
        	'created_at' => $date,
        	'updated_at' => $date
        ]);

        \DB::table('docentes')->insert([
            'id' => 1,
        	'nombre' => "Corina NoRecuerdoSuFeo Apellido",
        	'created_at' => $date,
        	'updated_at' => $date
        ]);

        \DB::table('ofertas')->insert([
        	'grupo' => "Introduccion a la Programacion",
            'materia_id' => 1,
            'docente_id' => 1,
            'hora' => "18:30",
            'dia' => 2,
        	'created_at' => $date,
        	'updated_at' => $date
        ]);
    }
}
