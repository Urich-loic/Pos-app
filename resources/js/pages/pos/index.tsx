import { Product, Category, CartItem } from "@/types";
import { Head, router } from "@inertiajs/react";
import { LayoutGrid, LayoutGridIcon, Link, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface Props{
    products: Product[],
    cartItems: CartItem[]
}

export default function PosIndex({ products }: Props) {

    const [search, setSearch] = useState('');
    const [cart, setCart] = useState<CartItem[]>([]);

    const filtered = products.filter(
        p=> p.name.toLowerCase().includes(search.toLowerCase()) || p.category?.name.toLowerCase().includes(search.toLowerCase()));

    const addToCart = (product: Product) => {
       setCart(
        current=>{
             const existing = current.find(item => item.product.id === product.id)
                if(existing){
                    return current.map(
                        item => item.product.id === product.id ? {
                            ...item, 
                            quantity: item.quantity + 1, 
                            total: (item.quantity + 1) * item.product.price} : item
                        )}
        return [...current,{ product, quantity: 1, total: product.price }]

        });
}

return <>
    <Head title="Point of Sale" />
    <div className="flex h-screen flex-col">
        <div className="flex flex-row items-center p-4 gap-4 border-b">
            <Link href="/dashboard" className="flex items-center gap-2 text-blue-500 hover:text-blue-700">
                <LayoutGridIcon/>
            </Link>
            <span>Point of sale</span>
            <div className="relative flex flex-1 items-center gap-2 max-w-sm ml-4">
                <Search className="absolute left-3  h4 w-4 "/>
                <Input className="pl-8" type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
        </div>
    </div>
    
</>;

}

PosIndex.layout ={
    breadcrumbs: [
        { 
            title: 'Pos home', 
            href: '/pos-home' 
        }
    ]
}