import { createBrowserRouter } from "react-router";
import { Homelayout } from "../Layouts/Homelayout/Homelayout";
import Landingpage from "@/Pages/HomePages/Landingpage";
import  AddBook from "@/Pages/HomePages/AddbookPage/AddBook";

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
        path:"/addbooks",
        element:<AddBook/>,
      },
    ]
  },
])