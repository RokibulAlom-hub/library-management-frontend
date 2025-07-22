import { createBrowserRouter } from "react-router";
import { Homelayout } from "../Layouts/Homelayout/Homelayout";
import Landingpage from "@/Pages/HomePages/Landingpage";
import  AddBook from "@/Pages/HomePages/AddbookPage/AddBook";
import  UpdateBook from "@/Pages/HomePages/UpdateBookpage/UpdateBook";
import BorrowSummary from "@/Pages/HomePages/BorrowSummaryPage/BorrowSummary";
import  AllBooksList from "@/Pages/HomePages/AllbookList/AllBookList";
import  DetailsPage from "@/Pages/HomePages/DetailsPage/DetailsPage";

export const router = createBrowserRouter([
    {
    path: "/",
    element: <Homelayout/>,
    children:[
      {
        path:"/",
        element:<Landingpage/>,
      },
      {
        path:"/allbooks",
        element:<AllBooksList/>,
      },
      {
        path:"/details-book/:id",
        element:<DetailsPage/>,
      },
      {
        path:"/addbooks",
        element:<AddBook/>,
      },
      {
        path:"/update-book/:id",
        element:<UpdateBook/>,
      },
      {
        path:"/borrow",
        element:<BorrowSummary/>
      },
    ]
  },
])