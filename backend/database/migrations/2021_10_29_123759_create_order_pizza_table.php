<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderPizzaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_pizza', function (Blueprint $table) {
            $table->primary(['order_id', 'pizza_id']);
            $table->unsignedBigInteger('pizza_id');
            $table->unsignedBigInteger('order_id');
            $table->integer('count')->default(0);
            $table->timestamps();

            $table->foreign('pizza_id')->references('id')->on('pizzas')->onDelete('cascade');
            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('order_pizza');
    }
}
