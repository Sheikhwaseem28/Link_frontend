import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./routeTree"
import HomePage from "../pages/HomePage"
import AuthPage from "../pages/AuthPage"

export const homePageRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: AuthPage,
  })