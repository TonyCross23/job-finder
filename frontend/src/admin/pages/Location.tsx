import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useFetchLocation } from "@/hooks/useFetchLocation";
import { locationSchema, type LocationFormData } from "@/validators/location";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const Locations = () => {
    const [open, setOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const { data: locations, isLoading, createMutation, updateMutation, deleteMutation } = useFetchLocation();

    const form = useForm<LocationFormData>({
        resolver: zodResolver(locationSchema),
        defaultValues: { name: "", description: "" },
    });

    const handleClose = () => {
        setOpen(false);
        setEditingId(null);
        form.reset({ name: "", description: "" });
    };

    const onSubmit = async (data: LocationFormData) => {
        try {
            if (editingId) {
                await updateMutation.mutateAsync({ id: editingId, data });
            } else {
                await createMutation.mutateAsync(data);
            }
            handleClose();
        } catch (error) {
            console.error(error);
        }
    };

    const onEdit = (loc: any) => {
        setEditingId(loc.id);
        form.reset({ name: loc.name, description: loc.description || "" });
        setOpen(true);
    };

    return (
        <div className="flex flex-col gap-6 p-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Location Settings</h1>

                <Button className="gap-2" onClick={() => {
                    setEditingId(null);
                    form.reset({ name: "", description: "" });
                    setOpen(true);
                }}>
                    <Plus className="h-4 w-4" /> Add New
                </Button>

                <Dialog open={open} onOpenChange={(val) => !val && handleClose()}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingId ? "Edit Location" : "Create Location"}</DialogTitle>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField control={form.control} name="name" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl><Input placeholder="Yangon" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="description" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl><Textarea placeholder="Description..." {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <DialogFooter>
                                    <Button type="button" variant="outline" onClick={handleClose}>Cancel</Button>
                                    <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                                        {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        {editingId ? "Update" : "Save"}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="rounded-xl border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow><TableCell colSpan={3} className="text-center py-10">Loading...</TableCell></TableRow>
                        ) : locations?.map((loc) => (
                            <TableRow key={loc.id}>
                                <TableCell className="font-bold">{loc.name}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => onEdit(loc)} className="gap-2">
                                                <Pencil className="h-4 w-4" /> Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => confirm("Delete?") && deleteMutation.mutate(loc.id)}
                                                className="text-destructive gap-2"
                                            >
                                                <Trash2 className="h-4 w-4" /> Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};