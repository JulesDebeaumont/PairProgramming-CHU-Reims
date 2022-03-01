<?php

namespace App\Http\Requests;

use App\Rules\CriteriaValueMatchsTermType;
use App\Rules\isComparisonOperator;
use App\Rules\isLogicalOperator;
use Illuminate\Foundation\Http\FormRequest;

class RulePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => ['max:255', 'unique:rules,name'],
            'sub_rules' => ['required', 'array', 'min:1'],
            'sub_rules.*.id' => ['integer', 'min:1', 'exists:rules,id'],
            'sub_rules.*.pivot.operator_id' => ['required', new isLogicalOperator],
            'sub_rules.*.criterias' => ['required', 'array', 'min:1'],
            'sub_rules.*.criterias.*.id' => ['integer', 'min:1', 'exists:criterias,id'],
            'sub_rules.*.criterias.*.operator_id' => ['required', new isComparisonOperator],
            'sub_rules.*.criterias.*.pivot.operator_id' => ['required', new isLogicalOperator],
            'sub_rules.*.criterias.*.term_id' => ['required', 'exists:terms,id'],
            'sub_rules.*.criterias.*.value' => ['required', 'min:1', 'max:255', new CriteriaValueMatchsTermType],
        ];
    }
}
