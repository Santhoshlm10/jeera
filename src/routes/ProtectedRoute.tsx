import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

const ProtectedRoute = () => {
  const auth: any = useAuth();
  console.log("AuthData", auth);
  if (!auth || !auth.token) {
    return <Navigate to="/login" />;
  }
  return (
    <div>
      <h1>Protected Route</h1>
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;
