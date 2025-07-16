import { createBrowserRouter } from "react-router";
import { Homelayout } from "../Layouts/Homelayout/Homelayout";

export const router = createBrowserRouter([
    {
    path: "/",
    element: <Homelayout/>
  },
])