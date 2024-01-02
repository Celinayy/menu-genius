<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reservation', function (Blueprint $table) {
            $table->id(); 
            $table->integer('numberOfGuests');
            $table->timestamp('arrivalTime')->nullable();
            $table->timestamp('getawayTime')->nullable();
            $table->string('name'); 
            $table->string('phone'); // Ugyanez itt is
            $table->integer('deskId');
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservetion');
    }
};
