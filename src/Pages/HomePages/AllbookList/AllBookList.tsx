import { Button } from "@/components/ui/button";
import {
  useCreateBorrowBookMutation,
  useDeleteBookMutation,
  useGetBooksQuery,
} from "@/redux/api/baseApi";
import { Link } from "react-router";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { IBooks } from "@/types";
import { BookOpen, Pencil, Trash2 } from "lucide-react";

const AllBooksList = () => {
  const [isBorrowing, setIsborrowing] = useState(false);
  const [quantity, setBorrowQuantity] = useState(1);
  const [dueDate, setDuedate] = useState("");
  const [selectBook, setselectBook] = useState(null);
  const { data: bookData, isLoading: getLoading } = useGetBooksQuery([]);
  const [deleteBook] = useDeleteBookMutation();
  const [createBorrow] = useCreateBorrowBookMutation();
  const books = bookData?.books;

  if (getLoading) return <div>Loading...</div>;

  const handleDelete = async (bookId: string) => {
    await deleteBook(bookId);
    alert("Delete succeeded");
  };

  const handleBorrow = async (bookID: string) => {
    const finalData = { bookID, quantity, dueDate };
    await createBorrow(finalData);
    alert("Book borrowed successfully");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Library Books</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Author</th>
              <th className="p-3">Genre</th>
              <th className="p-3">ISBN</th>
              <th className="p-3">Description</th>
              <th className="p-3">Copies</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book: IBooks) => (
              <tr key={book.isbn} className="border-t">
                <td className="p-3">{book.title}</td>
                <td className="p-3">{book.author}</td>
                <td className="p-3">{book.genre}</td>
                <td className="p-3">{book.isbn}</td>
                <td className="p-3 max-w-xs truncate">{book.description}</td>
                <td className="p-3">{book.copies}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-white text-xs ${
                      book.copies > 0 ? "bg-green-600" : "bg-red-600"
                    }`}
                  >
                    {book.copies > 0 ? "Available" : "Unavailable"}
                  </span>
                </td>
                <td className="p-3 flex gap-3 justify-center text-gray-700">
                  <Trash2
                    className="cursor-pointer text-red-600"
                    size={20}
                    onClick={() => handleDelete(book._id)}
                  />
                  <Link to={`/update-book/${book._id}`}>
                    <Pencil
                      className="cursor-pointer text-blue-600"
                      size={20}
                    />
                  </Link>
                  <BookOpen
                    className="cursor-pointer text-green-600"
                    size={20}
                    onClick={() => {
                      setIsborrowing(true);
                      setselectBook(book);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectBook && (
        <Dialog open={isBorrowing} onOpenChange={setIsborrowing}>
          <DialogContent>
            <DialogHeader>Borrow Book</DialogHeader>
            <DialogTitle>Borrow Modal</DialogTitle>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Quantity</label>
                <input
                  type="number"
                  className="input input-bordered w-full border p-2"
                  value={quantity}
                  min={1}
                  onChange={(e) => setBorrowQuantity(Number(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Due Date</label>
                <input
                  type="date"
                  className="input input-bordered w-full border p-2"
                  value={dueDate}
                  onChange={(e) => setDuedate(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={() => {
                  handleBorrow(selectBook._id);
                  setIsborrowing(false);
                  setselectBook(null);
                }}
              >
                Submit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AllBooksList;
