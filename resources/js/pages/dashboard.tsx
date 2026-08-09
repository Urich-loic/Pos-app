import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { dashboard } from '@/routes';
import { Sale } from '@/types';

interface State{
    today_revenue:string;
    today_transaction:number;
    total_product:number;
    low_stock_count:number;
}

interface TopProduct{
    product_name:string;
    total_qty:number;
    total_revenue:number;
}

interface Props{
    state:State;
    top_products:TopProduct[];
    recent_sales:Sale[]
}


export default function Dashboard({state, top_products, recent_sales}:Props) {
    return (
        <>
            <Head title="Dashboard" />
            <div className="p-6 space-y-6">
                <h2 className='text-2xl font-bold'>Dashboard</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    <StateCard title="Today's revenu" value={`$ ${state.today_revenue}`}/>
                    <StateCard title="Transactions day" value={`${state.today_transaction}`}/>
                    <StateCard title="Active product" value={`${state.total_product}`}/>
                    <StateCard title="Low product stock" value={`${state.low_stock_count.toString()}`}/>
                </div>
            </div>
            <div className="grid gap-6 p-6 lg:grid-cols-2">
                <div className="rounded-lg border">
                    <div className="p-4 py-2">
                        <h2 className='font-semibold mb-3'>Top rated product</h2>

                         <table className='w-full text-sm'>
                        <thead className=" bg-muted/50">
                           <tr>
                             <th className="px-3 py-4 text-left">Product</th>
                             <th className="px-3 py-4 text-left">Unit sold</th>
                             <th className="px-3 py-4 text-left">Revenue</th>
                           </tr>
                        </thead>
                        <tbody>
                            {top_products.length === 0 &&(
                                <tr>
                                    <td colSpan={6} className="px-3 py-6 text-center text-muted-foreground">
                                        No product yet.
                                    </td>
                                </tr>
                            )}
                            {
                                top_products.map((product)=>(
                                      <tr key={product.product_name} className="transition-colors hover:bg-muted/50 border-t py-3">
                                        <td className="px-3 py-4 text-left"> {product.product_name}</td>
                                        <td className="px-3 py-4 text-left"> {product.total_qty}</td>
                                        <td className="px-3 py-4 text-left"> $ {product.total_revenue}</td>
                                        </tr>
                                ))
                                   
                            }
                        </tbody>
                    </table>
                    </div>
                </div>

                 <div className="rounded-lg border">
                    <div className="p-4 py-2">
                        <h2 className='font-semibold  mb-3'>Recent sales</h2>
                        <div className="">
                            <div className="flex justify-between p-3">
                                <span>Sale ID</span>
                            </div>
                            <div className="p-3">
                                {recent_sales.map((sale)=>(
                                    <div key={sale.id} className="flex gap-2 justify-between py-3 border-t" >
                                        <div className='font-bold'>
                                            Sale #{sale.id}
                                            <div className='text-xs font-normal'>{sale.items.map((i)=>(
                                                <p key={i.id}>{i.product_name} x {i.quantity} unit(s)</p>
                                            ))}</div>
                                        </div>

                                        <div className='font-bold'>
                                            ${sale.cash_tendered}
                                        </div>
                                        
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};


function StateCard({title, value, highlight=false}:{title:string;value:string;highlight?:boolean}){
    return (
        <div className={`rounded-xl border p-4 ${highlight? 'border-orange-500 bg-white-50 dark:bg-orange-950/20':'bg-card'}`}>
            <p className='text-sm'>{title}</p>
            <p className='text-2xl font-bold mt-2'>{value}</p>
        </div>
    );
}