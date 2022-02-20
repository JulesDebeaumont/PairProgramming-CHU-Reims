<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            TermTypeSeeder::class,
            TermSeeder::class,
            OperatorTypeSeeder::class,
            OperatorSeeder::class,
            CriteriaSeeder::class,
            CriteriaTermSeeder::class,
            RuleSeeder::class,
            CriteriaRuleSeeder::class,
            RuleChildrenSeeder::class,
        ]);
    }
}
