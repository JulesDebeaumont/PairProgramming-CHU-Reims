<?php

namespace Database\Seeders;

use App\Models\OperatorType;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OperatorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('operators')->insert([
            'value' => 'ET',
            'operator_type_id' => OperatorType::where('name', 'Logical')->first()->id,
        ]);

        DB::table('operators')->insert([
            'value' => 'OU',
            'operator_type_id' => OperatorType::where('name', 'Logical')->first()->id,
        ]);

        DB::table('operators')->insert([
            'value' => '=',
            'operator_type_id' => OperatorType::where('name', 'Comparison')->first()->id,
        ]);

        DB::table('operators')->insert([
            'value' => '!=',
            'operator_type_id' => OperatorType::where('name', 'Comparison')->first()->id,
        ]);

        DB::table('operators')->insert([
            'value' => '<',
            'operator_type_id' => OperatorType::where('name', 'Comparison')->first()->id,
        ]);

        DB::table('operators')->insert([
            'value' => '>',
            'operator_type_id' => OperatorType::where('name', 'Comparison')->first()->id,
        ]);
    }
}
