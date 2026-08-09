<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\PosController;
use App\Http\Controllers\ProductController;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::resource('products', ProductController::class, )->except(['create','edit','show']);
    Route::resource('categories', CategoryController::class, )->except(['create','edit','show']);
    Route::get('pos-home', [PosController::class, 'index'])->name('pos');
    Route::post('checkout', [CheckoutController::class, 'store'])->name('checkout');
    Route::get('receipt/{sale}', [CheckoutController::class, 'receipt'])->name('receipt');

});

require __DIR__.'/settings.php';
