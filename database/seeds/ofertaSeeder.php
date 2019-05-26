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
            'rol' => "docente",
            'nombre_usuario' => "cf",
            'contra' => "cf123",
        	'created_at' => $date,
        	'updated_at' => $date
        ]);

        \DB::table('usuarios')->insert([
            'id' => 3,
            'nombre' => "Leticia",
            'Apellido' => "Blanco",
            'rol' => "docente",
            'nombre_usuario' => "lb123",
            'contra' => "lb123",
        	'created_at' => $date,
        	'updated_at' => $date
        ]);

        \DB::table('materias')->insert([
            'id' => 1,
        	'nombre' => "Introduccion a la Programacion",
        	'siglas' => "IP1",
        	'created_at' => $date,
        	'updated_at' => $date
        ]);

        \DB::table('materias')->insert([
            'id' => 2,
        	'nombre' => "Elementos de Programacion",
        	'siglas' => "IP1",
        	'created_at' => $date,
        	'updated_at' => $date
        ]);

        \DB::table('docentes')->insert([
            'id' => 1,
        	'nombre' => "Corina Flores",
        	'created_at' => $date,
        	'updated_at' => $date
        ]);

        \DB::table('docentes')->insert([
            'id' => 2,
        	'nombre' => "Leticia Blanco",
        	'created_at' => $date,
        	'updated_at' => $date
        ]);

        \DB::table('ofertas')->insert([
            'id' => 1,
            'grupo' => "1",
            'codigo' => "abc123",
            'materia_id' => 1,
            'docente_id' => 2,
            'hora' => "18:30",
            'dia' => 2,
        	'created_at' => $date,
        	'updated_at' => $date
        ]);

        \DB::table('ofertas')->insert([
            'id' => 2,
            'grupo' => "1",
            'codigo' => "abc123",
            'materia_id' => 2,
            'docente_id' => 3,
            'hora' => "16:30",
            'dia' => 5,
        	'created_at' => $date,
        	'updated_at' => $date
        ]);
        
        \DB::table('inscripcions')->insert([
            'id' => 1,
            'oferta_id' => 1,
            'usuario_id' => 1,
        	'created_at' => $date,
        	'updated_at' => $date
        ]);

        \DB::table('inscripcions')->insert([
            'id' => 2,
            'oferta_id' => 2,
            'usuario_id' => 1,
        	'created_at' => $date,
        	'updated_at' => $date
        ]);

        \DB::table('sesions')->insert([
            'id' => 1,
            'numero' => 1,
            'cerrado' => 1,
            'grupo_id' => 1,
        	'created_at' => $date,
        	'updated_at' => $date
        ]);

        \DB::table('sesions')->insert([
            'id' => 2,
            'numero' => 2,
            'cerrado' => 0,
            'grupo_id' => 1,
        	'created_at' => $date,
        	'updated_at' => $date
        ]);

        \DB::table('sesions')->insert([
            'id' => 3,
            'numero' => 1,
            'cerrado' => 0,
            'grupo_id' => 2,
        	'created_at' => $date,
        	'updated_at' => $date
        ]);

        \DB::table('productos')->insert([
            'id' => 1,
            'numero' => 1,
            'cerrado' => 1,
            'sesion_id' => 1,
            'fecha_caducidad' => $date,
            'descripcion' => "ejemplo",
        	'created_at' => $date,
        	'updated_at' => $date
        ]);

        \DB::table('productos')->insert([
            'id' => 2,
            'numero' => 1,
            'cerrado' => 1,
            'sesion_id' => 2,
            'fecha_caducidad' => $date,
            'descripcion' => "ejemplo",
        	'created_at' => $date,
        	'updated_at' => $date
        ]);

        \DB::table('productos')->insert([
            'id' => 3,
            'numero' => 2,
            'cerrado' => 0,
            'sesion_id' => 2,
            'fecha_caducidad' => $date,
            'descripcion' => "ejemplo",
        	'created_at' => $date,
        	'updated_at' => $date
        ]);

        \DB::table('productos')->insert([
            'id' => 4,
            'numero' => 1,
            'cerrado' => 0,
            'sesion_id' => 3,
            'fecha_caducidad' => $date,
            'descripcion' => "ejemplo",
        	'created_at' => $date,
        	'updated_at' => $date
        ]);

        \DB::table('entregas')->insert([
            'id' => 1,
            'fecha' => $date,
            'descripcion' => "Entrega de la tarea de elementos",
            'nombre_archivo' => "tarea",
            'tamanho' => 5,
            'tipo' => "txt",
            'usuario_id' => 1,
            'producto_id' => 4,
        	'created_at' => $date,
        	'updated_at' => $date
        ]);

    }
}
