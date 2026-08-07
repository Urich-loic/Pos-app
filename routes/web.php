<?php

use App\Models\Category;
use App\Models\Product;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::get('/products', function(){
         return Inertia::render('products/index', [
        'products' => Product::all(),
        'categories' => Category::all(),
    ]);
    });
        
   
});

require __DIR__.'/settings.php';
