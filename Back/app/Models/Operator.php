<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Operator extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'value',
        'operator_type_id'
    ];

    public function type()
    {
        return $this->belongsTo(OperatorType::class, 'operator_type_id');
    }

    public function criterias()
    {
        return $this->hasMany(Criteria::class);
    }

    public function criteriaRules()
    {
        return $this->hasMany(CriteriaRule::class);
    }

    public function ruleChildren()
    {
        return $this->hasMany(RuleChildren::class);
    }
}
