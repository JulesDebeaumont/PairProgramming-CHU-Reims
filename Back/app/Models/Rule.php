<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Staudenmeir\EloquentHasManyDeep\HasRelationships;

class Rule extends Model
{
    use HasFactory, HasRelationships;

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
                'operator_id',
            ]);
    }

    public function criteriaOperators()
    {
        return $this->hasManyDeep(Operator::class, [CriteriaRule::class]);
    }

    public function subRules()
    {
        return $this->belongsToMany(Rule::class, 'rule_childrens', 'rule_id', 'child_id')->using(RuleChildren::class)
            ->withPivot([
                'operator_id',
            ]);
    }

    public function subRuleOperators()
    {
        return $this->hasManyDeep(Operator::class, [RuleChildren::class]);
    }
}
