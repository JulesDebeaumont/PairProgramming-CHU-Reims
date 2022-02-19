<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('criteria_terms', function (Blueprint $table) {
            $table->id();
            $table->string('operator');
            $table->string('value');
            $table->foreignId('criteria_id')->constrained('criterias');
            $table->foreignId('term_id')->constrained('terms');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('criteria_terms');
    }
};
