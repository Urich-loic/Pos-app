import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Category, Product } from "@/types";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "sonner";
import { Pen, Trash } from "lucide-react";
import CategoryForm from "./category-form";

interface Props{
    categories: Category[]
}

export default function CategoryIndex({ categories }: Props) {
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<Category | null>(null);

    function handleEdit(category: Category) {
        setEditing(category);
        setShowForm(true);
    }

    function handleDelete(category: CategoryWithCount) {
        if(category > 0){
            toast.error(`Cannot delete ${category.name} it containes products.`);
            return;
        }
        if (confirm(`Are you sure you want to delete ${category.name}?`)) {
            // Call the delete API here
            router.delete(`/categories/${category.id}`), {
                onSuccess: () => toast.success(`${category.name} has been deleted.`),
            }
        
            }
        }

    function handleClose(){
        setShowForm(false);
        setEditing(null);
    }

    return <>
            <Head title="Categories" />
            <div className="flex flex-col p-4 space-y-4">
                 <div className="flex h-full flex-1 flex-row justify-between gap-4 overflow-x-auto rounded-xl">
                <h1 className="text-2xl font-bold">Category</h1>
                <Button 
                onClick={() => setShowForm(true)} 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Add Category
                    </Button>
                    
            </div>
            <div className="rounded-lg border">
                    <table className='w-full text-sm'>
                        <thead className="border-b bg-muted/50">
                           <tr>
                             <th className="px-3 py-4 text-left">Name</th>
                             <th className="px-3 py-4 text-left">Description</th>
                             <th className="px-3 py-4 text-left">Action</th>
                           </tr>
                        </thead>
                        <tbody>
                            {categories.length === 0 &&(
                                <tr>
                                    <td colSpan={6} className="px-3 py-6 text-center text-muted-foreground">
                                        No Categories yet please, click on Add category to get started
                                    </td>
                                </tr>
                            )}
                            {
                                categories.map((category)=>{
                                    return  <tr key={category.id} className="transition-colors hover:bg-muted/50">
                                        <td className="px-3 py-4 text-left"> {category.name}</td>
                                        <td className="px-3 py-4 text-left"> {category.description}</td>
                                        <td className="px-3 py-4 text-left flex gap-3"> 
                                            <Button className="hover:bg-blue-500" onClick={()=>handleEdit(category)}><Pen /></Button>
                                            <Button className="hover:bg-red-500" onClick={()=>handleDelete(category)}><Trash /></Button></td>
                                        </tr>
})
                            }
                        </tbody>
                    </table>
            </div>
   
            </div>
            {
                showForm && (<CategoryForm
                onClose={handleClose}
                cat={editing}
                />)
            }
    </>;
    }

    CategoryIndex.layout = {
        breadcrumbs:[
            {
                title:'Categories', 
                href:'/categories'
            }
        ]
    };