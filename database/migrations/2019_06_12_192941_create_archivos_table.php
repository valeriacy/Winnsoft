<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateArchivosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('archivos', function (Blueprint $table) {
            $table->increments('id');
            $table->integer("entrega_id");
            $table->string("nombre_archivo");
            $table->integer("tamanho");
            $table->string("tipo");
            $table->timestamps();
        });
        Schema::table('entregas', function($table) {
            $table->dropColumn('nombre_archivo');
            $table->dropColumn('tamanho');
            $table->dropColumn('tipo');
         });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('archivos');
        Schema::table('entregas', function($table) {
            $table->string('nombre_archivo');
            $table->integer('tamanho');
            $table->string('tipo');
         });
    }
}
