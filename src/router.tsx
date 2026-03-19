import { createBrowserRouter } from "react-router"
import Questions from "./pages/Questions";
import Question from "./pages/Question";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Questions/>
    },
    {
        path: "/:id",
        element: <Question/>
    }
]);

export default router