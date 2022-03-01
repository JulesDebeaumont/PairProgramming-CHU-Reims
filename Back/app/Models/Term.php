<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Term extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'term_type_id',
        'input_type',
    ];

    public function type()
    {
        return $this->belongsTo(TermType::class, 'term_type_id');
    }

    public function criterias()
    {
        return $this->hasMany(Criteria::class);
    }
}
