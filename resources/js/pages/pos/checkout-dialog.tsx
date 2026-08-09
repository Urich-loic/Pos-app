import { CartItem } from "@/types";
import { useState } from "react";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
interface Props{
    open:boolean,
    items:CartItem[],
    subTotal:number,
    onSuccess:()=>void,
    onClose:()=>void
}

export default function CheckoutDialog({open, items, subTotal, onSuccess, onClose}:Props){
    const [cashInput, setCashInput] = useState('');
    const [processing, setProcession] = useState(false);
    const [error, setError] = useState<string|null>();

    const cash = parseFloat(cashInput)||0;
    const change = cash - subTotal;


    function handleCheckout(){
        if(cash < subTotal){
            setError('Cash amount is less than total')
            return;
        }

        setError(null)
        setProcession(true)

        router.post(`/checkout`,{
            items: items.map(i=> ({product_id:i.product.id, quantity:i.quantity})),
            cash_tendered:cash
        },{
            onSuccess:()=>{
                setProcession(false);
                setCashInput('');
                onSuccess();
                
            },
            onError:()=>{
                setProcession(false);
                setError(Object.values(errors)[0] as string);
                toast.error("Checkout fail. Please ccheck the error message");
            }
        })
    }


    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-sm">
                <DialogHeader>
                    <DialogTitle>Checkout</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="rounded-lg p-4 space-y-1">
                        {items.map(i=>(
                            <div key={i.product.id} className="flex justify-between text-sm">
                                <span>{i.product.name} x {i.quantity}</span>
                                <span>${(i.product.price * i.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                        <div className="flex justiify-between">
                            <span>Total</span>
                            <span>${subTotal.toFixed(2)}</span>
                        </div>
                        {/* {Cash tendered} */}
                        <div>
                        <label>Cash tendered</label>
                        <Input
                        id=""
                        className=""
                        step={0.01}
                        min={subTotal.toFixed(2)}
                        placeholder="0.00"
                        value={cashInput}
                        onChange={e=>{setCashInput(e.target.value); setError(null)}}
                        autoFocus
                        />
                        </div>
                        <div>
                            <label>Change</label>
                            <span className={`${change >= 0 ? "text-green-500":"text-desctructive"}`}>${change.toFixed(2)}</span>
                        </div>
                        {error&&<p className="text-sm text-desctructive">{error}</p>}

                        <Button className="w-full" onClick={handleCheckout}>
                            {processing? "Processing":"Complete Sale"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}