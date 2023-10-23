<?php

namespace App\Http\Controllers;
use App\Services\StatusService;

use Illuminate\Http\Request;

class StatusController extends Controller
{
    protected $service;
    public function __construct(StatusService $service)
    {
        $this->service = $service;
    }

    public function listar()
    {
        return $this->service->listar();
    }
}
