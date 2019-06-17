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
        date_default_timezone_set('America/Caracas');
        $date = date('Y/m/d h:i:s', time());

        \DB::table('usuarios')->insert([
            'id' => 1,
            'nombre' => "Ana Valeria",
            'Apellido' => "Cartagena Yuricevic",
            'rol' => "estudiante",
            'nombre_usuario' => "valecy",
            'contra' => "valecy",
        	'created_at' => $date,
        	'updated_at' => $date
        ]);

        \DB::table('usuarios')->insert([
            'id' => 2,
            'nombre' => "Corina",
            'Apellido' => "Flores",
            'rol' => "estudiante",
            'nombre_usuario' => "cf",
            'contra' => "cf123",
        	'created_at' => $date,
        	'updated_at' => $date
        ]);

        \DB::table('usuarios')->insert([
            'id' => 3,
            'nombre' => "Leticia",
            'Apellido' => "Blanco",
            'rol' => "estudiante",
            'nombre_usuario' => "lb",
            'contra' => "lb123",
        	'created_at' => $date,
        	'updated_at' => $date
        ]);

        \DB::table('usuarios')->insert([
            'id' => 4,
            'nombre' => "Camila Anahi",
            'Apellido' => "Cartagena Yuricevic",
            'rol' => "estudiante",
            'nombre_usuario' => "camicy",
            'contra' => "camicy",
        	'created_at' => $date,
        	'updated_at' => $date
        ]);

        \DB::table('usuarios')->insert([
            'id' => 5,
            'nombre' => "Gabriela",
            'Apellido' => "Balderrama",
            'rol' => "estudiante",
            'nombre_usuario' => "gabi",
            'contra' => "gabi123",
        	'created_at' => $date,
        	'updated_at' => $date
        ]);

        \DB::table('usuarios')->insert([
            'id' => 6,
            'nombre' => "Oscar",
            'Apellido' => "Zurita",
            'rol' => "estudiante",
            'nombre_usuario' => "os",
            'contra' => "os123",
        	'created_at' => $date,
        	'updated_at' => $date
        ]);

        \DB::table('usuarios')->insert([
            'id' => 7,
            'nombre' => "Admin",
            'Apellido' => "Admin",
            'rol' => "administrador",
            'nombre_usuario' => "admin",
            'contra' => "admin",
        	'created_at' => $date,
        	'updated_at' => $date
        ]);

        \DB::table('usuarios')->insert([
            'id' => 8,
            'nombre' => "Luis",
            'Apellido' => "Oviedo",
            'rol' => "estudiante",
            'nombre_usuario' => "lucho",
            'contra' => "lucho123",
        	'created_at' => $date,
        	'updated_at' => $date
        ]);

        \DB::table('usuarios')->insert([
            'id' => 9,
            'nombre' => "Lindsay",
            'Apellido' => "Montaño",
            'rol' => "estudiante",
            'nombre_usuario' => "lind",
            'contra' => "lind123",
        	'created_at' => $date,
        	'updated_at' => $date
        ]);

        \DB::table('usuarios')->insert([
            'id' => 10,
            'nombre' => "Jose",
            'Apellido' => "Gutierrez",
            'rol' => "estudiante",
            'nombre_usuario' => "pepe",
            'contra' => "pepe123",
        	'created_at' => $date,
        	'updated_at' => $date
        ]);

    }
}
