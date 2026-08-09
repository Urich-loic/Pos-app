<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Sale;
use App\Models\SaleItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(){
        $today = today();

        $todaySales = Sale::whereDate("created_at", $today)->where('status','completed')->get();

        $topProducts = SaleItem::select('product_name',DB::raw('SUM(quantity) as total_qty'),DB::raw('SUM(subtotal) as total_revenue'))
        ->whereHas('sale',fn($q)=>$q->whereDate('created_at',$today)->where('status','completed'))
        ->groupBy('product_name')
        ->orderByDesc('total_qty')->limit(5)
        ->get();

        $recentSales = Sale::with('items')->latest()->limit(5)->get();

        // dd($topProducts);

        return Inertia::render('dashboard',[
                'state'=>[
                    'today_revenue' => number_format((float) $todaySales->sum('total'),2),
                    'today_transaction' => $todaySales->count(),
                    'total_products'=>Product::where('is_active', true)->count(),
                    'low_stock_count'=>Product::where('stock','<=', 5)->count(),
                ],
                'top_products'=>$topProducts,
                'recent_sales'=>$recentSales,
]);
    }
}
