import { Button } from "@/components/ui/button";
import { Sale } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { ArrowLeft, Printer } from "lucide-react";

interface Props{
    sale:Sale
}

export default function Receipt({sale}:Props){
    return (<>
    <Head title={`Receipt ${sale.id}`}/>
    <div className="no-print flex gap-2 border-b p-4">
        <Link href="/pos-home">
        <Button variant="outline">
            <ArrowLeft/>
              Back to POS
        </Button>
        </Link>
        <Button onClick={()=>window.print()}>
            <Printer className="mr-2 h-4 w-4"/>
            Print receipt
        </Button>
    </div>
    <div className="receipt-paper max-w-xs mx-auto p-6 text-sm font-mono">
            <div className="mb-4 text-center mb-4">
                <p className="text-xl">POS RECEIPT</p>
                <p className="text-xs">Your local shop</p>
                <p className="text-xs">Date : {new Date(sale.created_at).toLocaleString()}</p>
                <p className="text-xs mt-4">#receipt - {sale.id}</p>
            </div>
            <hr />
            <div className="pt-3 space-y-3 mt-4">
                {sale.items.map((item)=>(
                    <div key={item.id}>
                        <div className="flex justify-between">
                            <span className="flex truncate">{item.product_name}</span>
                            <span className="ml-2">${item.subtotal}</span>
                        </div>
                        <div className="text-lef my-4">
                            {item.quantity} x ${item.unit_price}
                        </div>
                        <hr />
                         <div className="flex justify-between mt-4">
                            <span className="flex font-bold truncate">Total</span>
                            <span className="ml-2">${sale.total}</span>
                        </div>
                         <div className="flex justify-between mt-2">
                            <span className="flex truncate">Cash tendered</span>
                            <span className="ml-2">${sale.cash_tendered}</span>
                        </div>
                        <div className="flex justify-between mt-2 mb-4">
                            <span className="flex truncate">Change</span>
                            <span className="ml-2">${sale.change_amount}</span>
                        </div>
                        <hr />
                        <div className="flex justify-center py-4"><p>Thank you for your purchase</p></div>
                    </div>
                    
                ))}
            </div>
    </div>
    </>);
}