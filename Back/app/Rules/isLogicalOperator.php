<?php

namespace App\Rules;

use App\Models\Operator;
use Illuminate\Contracts\Validation\Rule;

class isLogicalOperator implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $operator = Operator::find($value);
        if ($operator) {
            return $operator?->type?->name === "Logical";
        }

        return false;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'This operator should be a logical operator';
    }
}
