import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Category, Product } from "@/types";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "sonner";
import ProductForm from "./product-form";
import { Pen, Trash } from "lucide-react";

interface Props{
    products: Product[],
    categories: Category[]
}

export default function ProductIndex({ products, categories }: Props) {
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<Product | null>(null);

    function handleEdit(product: Product) {
        setEditing(product);
        setShowForm(true);
    }

    function handleDelete(product: Product) {
        if (confirm(`Are you sure you want to delete ${product.name}?`)) {
            // Call the delete API here
            router.delete(`/products/${product.id}`), {
                onSuccess: () => toast.success(`${product.name} has been deleted.`),
            }
        
            }
        }

    function handleClose(){
        setShowForm(false);
        setEditing(null);
    }

    return <>
            <Head title="Products" />
            <div className="flex flex-col p-4 space-y-4">
                 <div className="flex h-full flex-1 flex-row justify-between gap-4 overflow-x-auto rounded-xl">
                <h1 className="text-2xl font-bold">Products</h1>
                <Button 
                onClick={() => setShowForm(true)} 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Add Product
                    </Button>
                    
            </div>
            <div className="rounded-lg border">
                    <table className='w-full text-sm'>
                        <thead className="border-b bg-muted/50">
                           <tr>
                             <th className="px-3 py-4 text-left">Image</th>
                             <th className="px-3 py-4 text-left">Name</th>
                             <th className="px-3 py-4 text-left">Category</th>
                             <th className="px-3 py-4 text-left">Price</th>
                             <th className="px-3 py-4 text-left">Stock</th>
                             <th className="px-3 py-4 text-left">Status</th>
                             <th className="px-3 py-4 text-left">Action</th>
                           </tr>
                        </thead>
                        <tbody>
                            {products.length === 0 &&(
                                <tr>
                                    <td colSpan={6} className="px-3 py-6 text-center text-muted-foreground">
                                        No product yet please, click on Add product to get started
                                    </td>
                                </tr>
                            )}
                            {
                                products.map((product)=>{
                                    return  <tr key={product.id} className="transition-colors hover:bg-muted/50">
                                        <td className="px-3 py-4 text-left"> Image</td>
                                        <td className="px-3 py-4 text-left"> {product.name}</td>
                                        <td className="px-3 py-4 text-left"> {product.category?.name}</td>
                                        <td className="px-3 py-4 text-left"> {product.price}</td>
                                        <td className="px-3 py-4 text-left"> {product.stock}</td>
                                        <td className="px-3 py-4 text-left"> {product.is_active ? 'Active' : 'Inactive'}</td>
                                        <td className="px-3 py-4 text-left flex gap-3"> 
                                            <Button className="hover:bg-blue-500" onClick={()=>handleEdit(product)}><Pen /></Button>
                                            <Button className="hover:bg-red-500" onClick={()=>handleDelete(product)}><Trash /></Button></td>
                                        </tr>
})
                            }
                        </tbody>
                    </table>
            </div>
   
            </div>
            {
                showForm && (<ProductForm
                onClose={handleClose}
                products={editing}
                categories={categories}
                />)
            }
    </>;
    }

    ProductIndex.layout = {
        breadcrumbs:[
            {
                title:'Products', 
                href:'/products'
            }
        ]
    };