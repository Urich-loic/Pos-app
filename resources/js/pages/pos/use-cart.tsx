import { CartItem, Product } from "@/types";
import { useMemo, useReducer } from "react";


type CartAction = 
    | { type: 'ADD'; product: Product }
    | { type: 'REMOVE'; ProductId: number }
    | { type: 'SET_ITEM';  productId : number; quantity:number }
    | { type: 'CLEAR_CART' };

 function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
    switch (action.type) {
        case 'ADD':{
            
             const existing = state.find(item => item.product.id === action.product.id)
                if(existing){
                    return state.map(
                        item => item.product.id === action.product.id ? {
                            ...item, 
                            quantity: item.quantity + 1, 
                            total: (item.quantity + 1) * item.product.price} : item
                        )}
                return [...state,{ product: action.product, quantity: 1, total: action.product.price }]

                    }

        case 'REMOVE':{
            return state.filter(item => item.product.id !== action.ProductId);
        }

        case 'SET_ITEM':{
            if(action.quantity <= 0){
                return state.filter(item => item.product.id !== action.productId);
            }

            return state.map(item => item.product.id === action.productId ? {
                ...item,
                quantity: action.quantity,
                total: action.quantity * item.product.price
            } : item);
        }

        case 'CLEAR_CART':
            return [];
        default:
            return state;
    }
 }

 export function useCart(){
    const [items, dispatch] = useReducer(cartReducer,[]);

    const subtotal = useMemo(()=>items.reduce((sum, i)=>sum + parseFloat(i.product.price) * i.quantity, 0),[items]);

    return {
        items,
        subtotal,
        addItem:(product: Product)=>dispatch({type:'ADD', product}),
        setQuantity:(product:Product, quantity:number)=>dispatch({type:'SET_ITEM', productId: product.id, quantity}),
        removeItem:(productId:number)=>dispatch({type:'REMOVE', ProductId: productId}),
        clear:()=>dispatch({type:'CLEAR_CART'})
    }
 }