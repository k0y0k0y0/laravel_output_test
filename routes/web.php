<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/drills/new', [App\Http\Controllers\DrillsController::class, 'new'])->name('drills.new');
Route::post('/drills', [App\Http\Controllers\DrillsController::class, 'create'])->name('drills.create');
Route::get('/drills', [App\Http\Controllers\DrillsController::class, 'index'])->name('drills');
Route::get('/drills/{id}/edit', [App\Http\Controllers\DrillsController::class, 'edit'])->name('drills.edit');
Route::post('/drills/{id}', [App\Http\Controllers\DrillsController::class, 'update'])->name('drills.update');

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
