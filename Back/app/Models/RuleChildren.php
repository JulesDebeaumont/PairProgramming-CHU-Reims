<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class RuleChildren extends Pivot
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'operator_id',
        'parent_id',
        'rule_id'
    ];

    public function operator()
    {
        return $this->belongsTo(Operator::class, 'operator_id');
    }
}
