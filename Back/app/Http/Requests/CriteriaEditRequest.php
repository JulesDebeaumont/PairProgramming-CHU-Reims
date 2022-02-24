<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CriteriaEditRequest extends FormRequest
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
            'name' => ['required', 'unique:criterias','min:2', 'max:255'],
            'value' => ['required', 'min:2', 'max:255'],
            'term_id' => ['required', 'exists:terms,id'],
            'operator_id' => ['required', 'exists:operators,id'],
        ];
    }
}
