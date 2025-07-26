import { Button } from "@/components/ui/button";
import {
  useCreateBorrowBookMutation,
  useDeleteBookMutation,
  useGetBooksQuery,
} from "@/redux/api/baseApi";
import { Link, useNavigate } from "react-router";
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
import Swal from "sweetalert2";
const AllBooksList = () => {
  const [isBorrowing, setIsborrowing] = useState(false);
  const [quantity, setBorrowQuantity] = useState(1);
  const [dueDate, setDuedate] = useState("");
  const [selectBook, setselectBook] = useState<IBooks | null>(null);
  const { data: bookData, isLoading: getLoading ,isError} = useGetBooksQuery([]);
  const [deleteBook] = useDeleteBookMutation();
  const [createBorrow] = useCreateBorrowBookMutation();
  const books = bookData?.books;
  const navigate = useNavigate();
  if (getLoading) return <div>Loading...</div>;
 if (isError || !books)
    return (
      <div className="text-center mt-10 text-red-600">
        Failed to load data.
      </div>
    );
  const handleDelete = async (bookId: string | undefined) => {
    Swal.fire({
      title: "Do you want to Delete?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        await deleteBook(bookId);
        Swal.fire("Delete!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const handleBorrow = async (bookID: string | undefined) => {
    const finalData = { bookID, quantity, dueDate };
    console.log(bookID, quantity, dueDate);

    await createBorrow(finalData);
    Swal.fire({
      title: "Success!",
      text: "Boorrow Done",
      icon: "success",
      confirmButtonText: "Cool",
    });
    navigate(`/borrow`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Library Books</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Title</th>
              <th className="p-3">Author</th>
              <th className="p-3">Genre</th>
              <th className="p-3">ISBN</th>

              <th className="p-3">Copies</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book: IBooks, index: number) => (
              <tr key={index} className="border-t">
                <td>{index + 1}</td>
                <td className="p-3">{book.title}</td>
                <td className="p-3">{book.author}</td>
                <td className="p-3">{book.genre}</td>
                <td className="p-3">{book.isbn}</td>

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
