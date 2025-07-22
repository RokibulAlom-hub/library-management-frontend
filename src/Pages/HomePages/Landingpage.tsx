import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { IBooks } from "@/types";
import { cn } from "@/lib/utils";
import { useGetBooksQuery } from "@/redux/api/baseApi";
import { Link } from "react-router";

const Landingpage = () => {
  // const books = useappSelector(selectBooks) as [];

  const { data: bookData, isLoading: getLoading } = useGetBooksQuery([]);

  const books = bookData?.books;

  if (getLoading) {
    return <div>loading</div>;
  }

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
              <Link
                to={`/details-book/${book?._id}`}
                className=" border p-2 rounded-xl text-white bg-green-700"
              >
                Details
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Landingpage;
