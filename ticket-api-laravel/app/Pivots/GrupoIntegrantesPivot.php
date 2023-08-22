<?php

namespace App\Pivots;

use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\Model;

class GrupoIntegrantesPivot extends Pivot
{
    protected $table = "grupos_integrantes";

    protected $fillable = [
       'grupo_id',
       'usuario_id',
       'status'
    ];

    public function __construct(Model $parent = null, $attributes = [], $table = null, $exists = false)
    {
        parent::__construct();
        $this->setTable('grupos_integrantes');

        $this->forceFill($attributes);
        $this->syncOriginal();
        $this->parent = $parent;
        $this->exists = $exists;
        $this->timestamps = $this->hasTimestampAttributes();
    }

}
