import { createBrowserRouter, RouteObject } from "react-router-dom";
import { HomePage } from '../pages/home/home_page';
import { PresentationMakerPage } from "../pages/presentation_maker/presentation_maker_page";
import { LoginPage } from "../pages/login/login_page";
import { ProtectedRoute } from './protected_route';
import { ADMIN_ROLES, VIEWER_ROLES } from "../constants/roles";
import { PresentationVisualizationPage } from "../pages/presentation_visualization/presentation_visualization_page";
import { RegisterPage } from "../pages/register/register_page";
import { AuthContextProvider } from '../contexts/auth_context';
import { LoginRoute } from './login_route';
import { AdminRegisterPage } from "../pages/admin_register/admin_register_page";
import { PresentationMakerPageV2 } from '../pages/presentation_maker/presentation_maker_page_v2';
import { FileUploader } from "../pages/file_uploader/file_uploader";
import { PresentationVisualizationPagev2 } from '../pages/presentation_visualization/presentation_visualization_page_v2';

export const router = createBrowserRouter([
    {
        element: <ProtectedRoute allowedRoles={ VIEWER_ROLES }/>,
        children: [
            {
                index: true,
                path: "/",
                element: <HomePage/>,
            },
            {
                path: "/presentation/:id",
                element: <PresentationVisualizationPagev2/>,
            }/* ,
            {
                path: "/presentation/md/:id",
                element: <PresentationVisualizationPagev2/>,
            } */
        ]
    },
    {
        element: <ProtectedRoute allowedRoles={ ADMIN_ROLES }/>,
        children: [
            {
                path: "/presentation/maker",
                element: <PresentationMakerPageV2/>,
            },
        ]
    },
    {
        element: <ProtectedRoute allowedRoles={ ADMIN_ROLES }/>,
        children: [
            {
                path: "/admin/register",
                element: <AdminRegisterPage/>,
            },
        ]
    },
    {
        element: <ProtectedRoute allowedRoles={ ADMIN_ROLES }/>,
        children: [
            {
                path: "/file/uploader",
                element: <FileUploader/>,
            },
        ]
    },
    {
        element: <LoginRoute/>,
        children: [
            {
                path: "/login",
                element: <LoginPage/>,
            },
            {
                path: "/register",
                element: <RegisterPage/>,
            }
        ]
    }
]);