<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

/**
 * @property bool $manter_catalogo
 * @mixin Builder
 */
class Permissoes extends Model
{
    protected $table = 'permissoes';

    protected $fillable = [
        'usuario_id',
        'area_id',
        'abrir_chamados',
        'abrir_chamados_restritos',
        'atender_chamados',
        'relatorios',
        'manter_catalogo',
        'manter_permissoes'
    ];

    protected $visible = [
        'abrir_chamados',
        'abrir_chamados_restritos',
        'atender_chamados',
        'relatorios',
        'manter_catalogo',
        'manter_permissoes'
    ];

    public function usuario()
    {
        return $this->hasOne(User::class, 'id', 'usuario_id');
    }
}
