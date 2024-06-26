import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { Nav } from "../components/Nav";
import { Header } from "../components/Header";
export const AuthenticatedRoutes = () => {
  const { access_token } = useAuth();

  if (!access_token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="h-screen grid grid-rows-[60px_1fr] ">
      <Header user={name} />

      <div className=" grid grid-cols-[200px_1fr] grid-rows-1 ">
        <Nav />
        <Outlet />
      </div>
    </div>
  );
};
