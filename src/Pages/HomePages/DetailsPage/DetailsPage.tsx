import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Loader } from "lucide-react";
import type { IBooks } from "@/types";

const DetailsPage = () => {
  const [bookData, setBookData] = useState<IBooks | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/api/books/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBookData(data.book);
        setLoading(false);
      });
  }, [id]);
  console.log(bookData);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin w-8 h-8 text-blue-500" />
      </div>
    );
  }

  if (!bookData) {
    return (
      <div className="text-center text-red-600 font-semibold mt-10">
        Book not found.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10 border">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-700">
        {bookData?.title}
      </h1>
      <p className="text-center text-gray-600 italic mb-6">
        by {bookData?.author}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
        <div>
          <span className="font-medium">Genre:</span> {bookData?.genre}
        </div>
        <div>
          <span className="font-medium">ISBN:</span> {bookData?.isbn}
        </div>
        <div>
          <span className="font-medium">Copies:</span> {bookData?.copies}
        </div>
        <div>
          <span className="font-medium">Availability:</span>{" "}
          <span
            className={`font-semibold ${
              bookData.copies > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {bookData.copies > 0 ? "Available" : "Unavailable"}
          </span>
        </div>
        <div>
          <span className="font-medium">Published:</span>{" "}
          {new Date(bookData.createdAt).toLocaleDateString()}
        </div>
       
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Description:</h2>
        <p className="text-gray-800 leading-relaxed">{bookData.description}</p>
      </div>
    </div>
  );
};

export default DetailsPage;
