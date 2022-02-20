<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TermTypeEditRequest extends FormRequest
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
            'name' => ['required', 'unique:term_types','min:2', 'max:255'],
        ];
    }
}
