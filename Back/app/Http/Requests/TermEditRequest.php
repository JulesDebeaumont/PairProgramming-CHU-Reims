<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class TermEditRequest extends FormRequest
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
            'id' => ['required', 'exists:terms,id'],
            'name' => ['required', Rule::unique('terms', 'name')->ignore($this->term), 'min:2', 'max:255'],
            'term_type_id' => ['required', 'exists:term_types,id']
        ];
    }
}
