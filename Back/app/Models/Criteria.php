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
    ];

    public function terms()
    {
        return $this->belongsToMany(Term::class, 'terms')->using(CriteriaTerm::class);
    }

    public function rules()
    {
        return $this->belongsToMany(Rule::class, 'rules')->using(CriteriaRule::class);
    }
}
