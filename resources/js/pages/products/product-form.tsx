import InputError from "@/components/input-error";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogContent, DialogHeader, DialogOverlay } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Category, Product } from "@/types";
import { Head, router, useForm } from "@inertiajs/react";
import { Dialog, DialogTitle } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import { SelectContent } from "@radix-ui/react-select";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
    categories: Category[],
    products?:Product|null,
}

export default function ProductForm({ categories, products, onClose }: Props) {
    const { data, setData, post, put, errors, reset} = useForm({ 
        name: products?.name || '',
        category_id: products?.category_id || '',
        categories: categories || [],
        description: products?.description || '',
        price: products?.price || 0,
        stock: products?.stock || 0,
        is_active: products?.is_active || true,
        image: null as File || null,
    })

    function submit(e) {
            e.preventDefault();
            const opt = {
                forceFormData:true,
                onSuccess: () => {
                        toast.success('Product created successfully');
                        reset();
                        onClose();
                    },
            }
            
            products ? put(`/products/${products.id}`, opt) : post('/products',opt);
            }
        

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent className="max-w-lg">
                <div className="bg-white p-6 rounded-lg w-full max-w-md">
                    <DialogHeader className="text-xl font-bold mb-4">
                        <DialogTitle>{products ? 'Edit Product' : 'Add Product'}</DialogTitle>
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
                        <div>
                            <Label htmlFor="name">Category</Label>
                            <Select id="category_id" value={data.category_id} onValueChange={e => setData('category_id', e)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                    <SelectContent>
                                            {categories.map(category => (
                                                <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                                            ))}
                                    </SelectContent>
                                
                               <InputError message={errors.category_id} />
                            </Select>
                            
                        </div>
                    
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                            <Label htmlFor="price">Price($)</Label>
                            <Input type="number" id="price" value={data.price} onChange={e => setData('price', parseFloat(e.target.value) || 0)} placeholder="Product Price" />
                            <InputError message={errors.price} />
                        </div>
                        <div>
                            <Label htmlFor="stock">Stock</Label>
                            <Input type="number" id="stock" value={data.stock} onChange={e => setData('stock', parseInt(e.target.value) || 0)} placeholder="Product Stock" />
                            <InputError message={errors.stock} />
                        </div>
                        </div>
                       
                        <div>
                            <Label htmlFor="image">Image</Label>
                            <Input type="file" id="image" onChange={e => setData('image', e.target.files ? e.target.files[0] : null)} />
                            <InputError message={errors.image} />
                        </div>

                         <div className="flex items-center space-x-2">
                             <Checkbox id="is_active" checked={data.is_active} onCheckedChange={checked => setData('is_active', checked)} />
                            <Label htmlFor="is_active">Status</Label>
                            <InputError message={errors.is_active} />
                        </div>                                               

                        <div className="flex justify-end mt-4">
                            <button type="button" onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 rounded">Cancel</button>
                            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">{products ? 'Update' : 'Create'}</button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}