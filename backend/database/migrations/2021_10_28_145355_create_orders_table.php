<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();

            $table->enum('status', ['ORDERED','ACCEPTED','COOKED','DELIVERED']);

            $table->string('destination');
            $table->string('customer_name');
            $table->string('customer_phone');

            $table->datetime('accepted_at')->nullable();
            $table->datetime('cooked_at')->nullable();
            $table->datetime('delivered_at')->nullable();

            $table->unsignedBigInteger('accepted_by')->nullable();
            $table->unsignedBigInteger('cooked_by')->nullable();
            $table->unsignedBigInteger('delivered_by')->nullable();

            $table->timestamps();

            $table->foreign('accepted_by')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('delivered_by')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('cooked_by')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
