import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IBooks } from "@/types";
import { useParams } from "react-router";
import { useUpdateBookbyIdMutation } from "@/redux/api/baseApi";



const UpdateBook = () => {
  const {id}= useParams()
  const [updateFunctionByredux,{data}]=useUpdateBookbyIdMutation();
  const [form, setForm] = useState<IBooks>({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 0,
    available: true,
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  console.log("this is coming from data",data);
  

  const handleSubmit = async (e: React.FormEvent,) => {
    e.preventDefault();
    //  const { title, author, genre, isbn, description, copies } = form;
    console.log("this data is coming from ", form);
   try {

    const res = await updateFunctionByredux({
      id,
      updateData:{
        ...form,
        copies:Number(form.copies)
      }

    }).unwrap()
    
     console.log("Response after update:", res);

   } catch (err) {
    console.error("Update failed:", err);
   }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Update Book</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter book title"
              />
            </div>
            <div>
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                name="author"
                value={form.author}
                onChange={handleChange}
                placeholder="Enter author name"
              />
            </div>
            <div>
              <Label htmlFor="genre">Genre</Label>
              <Input
                id="genre"
                name="genre"
                value={form.genre}
                onChange={handleChange}
                placeholder="Enter genre"
              />
            </div>
            <div>
              <Label htmlFor="isbn">ISBN</Label>
              <Input
                id="isbn"
                name="isbn"
                value={form.isbn}
                onChange={handleChange}
                placeholder="Enter ISBN"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter description"
              />
            </div>
            <div>
              <Label htmlFor="copies">Copies</Label>
              <Input
                id="copies"
                name="copies"
                type="number"
                value={form.copies}
                onChange={handleChange}
                placeholder="Enter number of copies"
              />
            </div>
            {error && <p className="text-destructive text-sm">{error}</p>}
            <Button type="submit" className="w-full">
              Update Book
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateBook;
