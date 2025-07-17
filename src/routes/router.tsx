import { createBrowserRouter } from "react-router";
import { Homelayout } from "../Layouts/Homelayout/Homelayout";
import Landingpage from "@/Pages/HomePages/Landingpage";

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
        element:<Landingpage/>,
      },
    ]
  },
])