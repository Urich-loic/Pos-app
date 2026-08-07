import InputError from "@/components/input-error";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogContent, DialogHeader, DialogOverlay } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Category } from "@/types";
import { Head, router, useForm } from "@inertiajs/react";
import { Dialog, DialogTitle } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import { SelectContent } from "@radix-ui/react-select";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
    cat: Category[],
}

export default function CategoryForm({ cat, onClose }: Props) {
    const { data, setData, post, put, errors, reset} = useForm({ 
        name: cat?.name || '',
        description: cat?.description || '',
    })

    const [category, setCategory] = useState<Category | null>(null);

    function submit(e) {
            e.preventDefault();
            const opt = {
                forceFormData:true,
                onSuccess: () => {
                        toast.success('Category created successfully');
                        reset();
                        onClose();
                    },
            }
            
            cat ? put(`/categories/${cat.id}`, opt) : post('/categories',opt);
            }
        

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent className="max-w-lg">
                <div className="bg-white p-6 rounded-lg w-full max-w-md">
                    <DialogHeader className="text-xl font-bold mb-4">
                        <DialogTitle>{cat ? 'Edit Category' : 'Add Category'}</DialogTitle>
                        </DialogHeader>
                    <form onSubmit={submit} className="space-y-4">
                        {/* Form fields for name, category, description, price, stock, is_active, image */}
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input type="text" id="name" value={data.name} onChange={e => setData('name', e.target.value)} placeholder="Product Name" />
                            <InputError message={errors.name} />
                        </div>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Input type="text" id="description" value={data.description} onChange={e => setData('description', e.target.value)} placeholder="Product Description" />
                            <InputError message={errors.description} />
                        </div>                                            

                        <div className="flex justify-end mt-4">
                            <button type="button" onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 rounded">Cancel</button>
                            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">{cat? 'Update' : 'Create'}</button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}