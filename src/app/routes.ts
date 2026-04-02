import { createBrowserRouter } from "react-router";
import { LandingPage } from "./components/LandingPage";
import { AppLayout } from "./components/AppLayout";
import { DiscoverPage } from "./components/DiscoverPage";
import { MatchesPage } from "./components/MatchesPage";
import { CampusPage } from "./components/CampusPage";
import { ProfilePage } from "./components/ProfilePage";
import { OnboardingPage } from "./components/OnboardingPage";
import { ChatPage } from "./components/ChatPage";
import { AdminLoginPage } from "./components/AdminLoginPage";
import { AdminDashboard } from "./components/AdminDashboard";
import { LoginPage } from "./components/LoginPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/onboarding",
    Component: OnboardingPage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/admin",
    Component: AdminLoginPage,
  },
  {
    path: "/admin/dashboard",
    Component: AdminDashboard,
  },
  {
    path: "/app",
    Component: AppLayout,
    children: [
      { index: true, Component: DiscoverPage },
      { path: "discover", Component: DiscoverPage },
      { path: "campus", Component: CampusPage },
      { path: "matches", Component: MatchesPage },
      { path: "matches/:id", Component: ChatPage },
      { path: "profile", Component: ProfilePage },
    ],
  },
]);
