import { Product } from "@/types";

interface CartItem{
    product:Product;
    quantity:number;
}


interface Props{
    products:Product[];
    onAdd:(product:Product)=>void;
}

export default function ProductGrid({products, onAdd}:Props){
    if(products.length === 0){
        return <div className="flex flex-1 flex-col overflow-y-auto p-4 justify-center items-center">No products yet</div>;
    }

    return <>
        <div className="flex flex-1 flex-col overflow-y-auto p-4">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {products.map((product)=>(
                <button
                key={product.id}
                onClick={()=>onAdd(product)}
                className="group flex flex-col items-center justify-center gap-2 rounded-lg hover:bg-gray-100">
                {
                product.image? (<img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded" />):(
                <div className="aspect-square rounded w-full bg-muted/50 flex items-center justify-center rounded">
                    {product.name.charAt(0)}
                </div>) } 
                <div className="p-2">
                    <p className="truncate text-medium">{product.name}</p>
                    <p className="text-sm text-primary">${product.price}</p>
                    <p className="text-xs text-muted-foreground"    >Stock : {product.stock}</p>
                </div>
                    
                </button>
            ))}
        </div>
        </div>
    </>;
}