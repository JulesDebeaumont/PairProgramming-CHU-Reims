<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rule extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
    ];

    public function criterias()
    {
        return $this->belongsToMany(Criteria::class, 'criteria_rules')->using(CriteriaRule::class)
            ->withPivot([
                'operator_id'
            ]);
    }

    public function rules()
    {
        return $this->belongsToMany(Rule::class, 'rule_childrens')->using(RuleChildren::class)
            ->withPivot([
                'operator_id'
            ]);
    }
}
