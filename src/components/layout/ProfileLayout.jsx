import { useAuth } from "../../contexts/AuthContext.jsx";
import AdminLayout from "./AdminLayout.jsx";
import PublicLayout from "./PublicLayout.jsx";

export default function ProfileLayout() {
  const { isAdmin } = useAuth();

  return isAdmin ? <AdminLayout /> : <PublicLayout />;
}
