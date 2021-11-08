<?php

namespace Database\Factories;

use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class OrderFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Order::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $possible_status = ['ORDERED','ACCEPTED','COOKED','DELIVERED'];
        $status = $this->faker->randomElement($possible_status);
        $accepted = null;
        $cooked = null;
        $delivered = null;

        switch ($status) {
            case 'ACCEPTED':
                $accepted  = $this->faker->dateTimeBetween('-89 hours','-70 hours');
                break;
            case 'COOKED':
                $accepted  = $this->faker->dateTimeBetween('-89 hours','-70 hours');
                $cooked = $this->faker->dateTimeBetween('-69 hours','-60 hours');
                break;
            case 'DELIVERED':
                $accepted  = $this->faker->dateTimeBetween('-89 hours','-70 hours');
                $cooked = $this->faker->dateTimeBetween('-69 hours','-60 hours');
                $delivered = $this->faker->dateTimeBetween('-59 hours','-55 hours');
                break;
            default:
                break;
        }

        return [
            'status' => $status,
            'accepted_at' => $accepted,
            'cooked_at' => $cooked,
            'delivered_at' => $delivered,
            'customer_name' =>  $this->faker->name(),
            'customer_phone' => $this->faker->numberBetween(9999999,999999999),
            'destination' => $this->faker->address,
        ];
    }
}
