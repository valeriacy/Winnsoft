<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SesionProductov2 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('sesions', function($table) {
            $table->date('fecha_caducidad');
         });
        Schema::table('productos', function($table) {
            $table->dropColumn('fecha_caducidad');
         });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('productos', function($table) {
            $table->date('fecha_caducidad');
         });
         Schema::table('sesions', function($table) {
            $table->dropColumn('fecha_caducidad');
         });
    }
}
