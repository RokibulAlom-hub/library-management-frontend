import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetBorrowBookDatasQuery } from "@/redux/api/baseApi";

// ✅ Corrected interface to match your data structure
interface IBorrowSummary {
  book: {
    title: string;
    isbn: string;
  };
  totalquantity: number;
}

const BorrowSummary = () => {
  const { data, isLoading, isError } = useGetBorrowBookDatasQuery(null);
  const summaryData = data?.data;

  if (isLoading)
    return <div className="text-center mt-10">Loading borrow summary...</div>;

  if (isError || !summaryData)
    return (
      <div className="text-center mt-10 text-red-600">
        Failed to load borrow summary.
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-bold">
            Borrowed Books Summary ({summaryData?.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Book Title</TableHead>
                <TableHead>ISBN</TableHead>
                <TableHead>Total Quantity Borrowed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {summaryData.map((entry: IBorrowSummary, index: number) => (
                <TableRow key={index}>
                  <TableCell>{entry.book.title}</TableCell>
                  <TableCell>{entry.book.isbn}</TableCell>
                  <TableCell>{entry.totalquantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BorrowSummary;
