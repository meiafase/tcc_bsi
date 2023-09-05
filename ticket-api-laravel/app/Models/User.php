<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'primeiro_acesso',
        'area_id',
        'tp_coord',
        'coord_id',
        'status',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'created_at',
        'updated_at',
        'pivot',
        'email_verified_at' => 'datetime',
    ];


    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function area()  {
        return $this->hasOne(Area::class,  'area_id', 'id');
    }

    public function permissoes()  {
        return $this->hasOne(Permissoes::class, 'usuario_id', 'id');
    }

    public function isCoordenador() : bool {
        return isset($this->tp_coord) && $this->tp_coord == 'S';
    }

    // public function grupos_integrantes() {
    //     return $this->hasMany(new GrupoIntegrantesPivot, 'id', 'grupo_id');
    // }
}
