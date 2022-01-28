<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DrillsController extends Controller
{
    public function new(){
        return view('drills.new');
    }
}
