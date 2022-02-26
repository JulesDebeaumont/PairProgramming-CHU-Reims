<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Criteria extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'value',
        'operator_id',
        'term_id'
    ];

    public function term()
    {
        return $this->belongsTo(Term::class, 'term_id');
    }

    public function operator()
    {
        return $this->belongsTo(Operator::class, 'operator_id');
    }

    public function rules()
    {
        return $this->belongsToMany(Rule::class, 'criteria_rules')->using(CriteriaRule::class)
            ->withPivot([
                'operator_id'
            ]);
    }
}
