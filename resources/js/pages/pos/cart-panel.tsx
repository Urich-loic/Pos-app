import { Product } from "@/types";
import { Trash2 } from "lucide-react";


interface CratItem{
    product:Product;
    quantity:number;
}

interface Props{
    items:CratItem[];
    subtotal:number;
    onAddItem:(product:Product)=>void;
    onSetQuantity:(product:Product, quantity:number)=>void;
    onRemoveItem:(productId:number)=>void;
    onClear:()=>void;
}

export default function CartPanel({items, subtotal, onAddItem, onSetQuantity, onRemoveItem, onClear}:Props){
    return <>
    <div className="w-80 flex flex-col border-1 bg-muted/20 p-4">
    <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h2 className="font-semibold text-sm">Cart</h2>
    {items.length>0?(
        <button onClick={onClear} className="text-gray-500  hover:text-destructive/80 text-sm">
            Clear all
        </button>
    ):null}
    </div>
    {items.length === 0 ? (
        <p> You have {items.length} item(s) in your cart </p>
    ):(
        items.map((item)=>(
            <div key={item.product.id} className="flex items-start justify-between py-4 mb-2">
                <div className=" flex-1 min-w-0">
                    <p className="truncate">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">${item.product.price} each</p>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => onSetQuantity(item.product, item.quantity - 1)} className="text-gray-500 hover:bg-blue-100 bg-gray-100 px-2 rounded-lg">
                        -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onSetQuantity(item.product, item.quantity + 1)} className="text-gray-500 hover:bg-blue-100 bg-gray-100 px-2 rounded-lg">
                        +
                    </button>
                    <Trash2 onClick={() => onRemoveItem(item.product.id)} className="text-gray-500 hover:text-destructive/80 cursor-pointer" />
                </div>
            </div>   
        ))
        
    )}
            <div className="flex flex-col gap-4 justify-between items-center mb-2 border-t pt-4">
                    <div className="total">
                        <span>Total: </span>
                        <span className="text-sm text-muted-foreground">${(subtotal).toFixed(2)}</span>
                    </div>
                    <button 
                    disabled = {items.length === 0} 
                    className="bg-blue-500 text-white px-4 py-1 w-full rounded hover:bg-blue-600">
                        Checkout
                    </button>
                </div>
            </div>

    </>;
}