import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useappSelector } from "@/redux/hook";
import type { IBooks } from "@/types";
import { selectBooks } from "@/redux/features/books/booksSlice";



const Landingpage = () => {
  const books = useappSelector(selectBooks) as [];

  // Placeholder action handlers
  const handleDelete = (isbn: string) => {
    // Dispatch delete action, e.g., dispatch(deleteBook(isbn));
    console.log(`Delete book with ISBN: ${isbn}`);
  };

  const handleUpdate = (book: IBooks) => {
    // Dispatch update action, e.g., dispatch(updateBook(book));
    console.log(`Update book: ${book.title}`);
  };

  const handleBorrow = (isbn: string) => {
    // Dispatch borrow action, e.g., dispatch(borrowBook(isbn));
    console.log(`Borrow book with ISBN: ${isbn}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Library Books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book:IBooks) => (
          <Card key={book.isbn} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{book.title}</CardTitle>
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
                <span className="font-medium">Description:</span> {book.description}
              </p>
              <p className="text-sm mb-2">
                <span className="font-medium">Copies:</span> {book.copies}
              </p>
              <Badge variant={book.available ? "default" : "destructive"}>
                {book.available ? "Available" : "Unavailable"}
              </Badge>
            </CardContent>
            <CardFooter className="flex justify-between gap-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(book.isbn)}
              >
                Delete
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleUpdate(book)}
              >
                Update
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => handleBorrow(book.isbn)}
                disabled={!book.available}
              >
                Borrow
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Landingpage;