import { createBrowserRouter, RouteObject } from "react-router-dom";
import { HomePage } from '../pages/home/home_page';
import { PresentationMakerPage } from "../pages/presentation_maker/presentation_maker_page";
import { LoginPage } from "../pages/login/login_page";
import { ProtectedRoute } from './protected_route';
import { ADMIN_ROLES, VIEWER_ROLES } from "../constants/roles";
import { PresentationVisualizationPage } from "../pages/presentation_visualization/presentation_visualization_page";
import { RegisterPage } from "../pages/register/register_page";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage/>,
    },
    {
        path: "/register",
        element: <RegisterPage/>,
    },
    {
        element: <ProtectedRoute allowedRoles={ VIEWER_ROLES }/>,
        children: [
            {
                path: "/",
                element: <HomePage/>,
            },
            {
                path: "/presentation/:id",
                element: <PresentationVisualizationPage/>,
            }
        ]
    },
    {
        element: <ProtectedRoute allowedRoles={ ADMIN_ROLES }/>,
        children: [
            {
                path: "/presentation/maker",
                element: <PresentationMakerPage/>,
            },
        ]
    }
]);