import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { IBooks } from "@/types";
import { cn } from "@/lib/utils";
import { useCreateBooksMutation, useCreateBorrowBookMutation, useDeleteBookMutation, useGetBooksQuery } from "@/redux/api/baseApi";
import { Link } from "react-router";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Landingpage = () => {
  // const books = useappSelector(selectBooks) as [];
  const [isBorrowing, setIsborrowing] = useState(false);
  const [quantity, setBorrowQuantity] = useState(1);
  const [dueDate, setDuedate] = useState("");
  const [selectBook,setselectBook] = useState(null)
  const { data: bookData, isLoading: getLoading } = useGetBooksQuery([]);
  const [deleteBook, { data: deleteData }] = useDeleteBookMutation();
  const [createBorrow,{data:borrowData}]=useCreateBorrowBookMutation();
  const books = bookData?.books;

  console.log(borrowData);

  if (getLoading) {
    return <div>loading</div>;
  }

  const handleDelete = async (bookId:string) => {
    const res = await deleteBook(bookId);
    console.log("coming from res", res, bookId);
    alert("delte succedded");
  };

  const handleBorrow = async(bookID: string) => {
    // Dispatch borrow action, e.g., dispatch(borrowBook(isbn));
    const finalData = {
      bookID,
      quantity,
      dueDate
    }
    const res = await createBorrow(finalData)
    console.log(bookID,quantity,dueDate,`thisi is form response`,res);
    alert("button is working ");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Library Books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book: IBooks) => (
          <Card key={book.isbn} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                {book.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">by {book.author}</p>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm mb-2">
                <span className="font-medium">Genre:</span> {book.genre}
              </p>
              <p className="text-sm mb-2">
                <span className="font-medium">ISBN:</span> {book.isbn}
              </p>
              <p className="text-sm mb-2">
                <span className="font-medium">Description:</span>{" "}
                {book.description}
              </p>
              <p className="text-sm mb-2">
                <span className="font-medium">Copies:</span> {book.copies}
              </p>
              <div
                className={cn(
                  "rounded border text-white bg-green-600 w-24 text-center",
                  {
                    "bg-red-700": book.copies <= 0,
                  }
                )}
              >
                {book.copies > 0 ? "Available" : "Unavailable"}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between gap-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(book?._id)}
              >
                Delete
              </Button>
              <Link
                to={`/update-book/${book?._id}`}
                className=" border p-2 rounded-xl text-white bg-blue-700"
              >
                Update
              </Link>
              <Button
                variant="default"
                size="sm"
                onClick={() => {setIsborrowing(true); setselectBook(book)}}
              >
                Borrow
              </Button>
              
            </CardFooter>
          </Card>
        ))}
      </div>
      {
        selectBook && (
           <Dialog open={isBorrowing} onOpenChange={setIsborrowing}>
                <DialogContent>
                  <DialogHeader>Borrow Book</DialogHeader>
                  <DialogTitle>Borrow Modal</DialogTitle>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium">
                        Quantity
                      </label>
                      <input
                        type="number"
                        className="input input-bordered w-full border p-2"
                        value={quantity}
                        min={1}
                       
                        onChange={(e) =>
                          setBorrowQuantity(Number(e.target.value))
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">
                        Due Date
                      </label>
                      <input
                        type="date"
                        className="input input-bordered w-full border p-2"
                        value={dueDate}
                        onChange={(e) => setDuedate(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={() => {
                      handleBorrow(selectBook._id);
                      setIsborrowing(false);
                      setselectBook(null)
                      }}>Submit</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
        )
      }
    </div>
  );
};

export default Landingpage;
