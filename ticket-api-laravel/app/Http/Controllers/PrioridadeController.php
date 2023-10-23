<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\PrioridadeService;


class PrioridadeController extends Controller
{
    public function __construct(PrioridadeService $service)
    {
        $this->service = $service;
    }

    public function listar()
    {
        return $this->service->listar();
    }
}
