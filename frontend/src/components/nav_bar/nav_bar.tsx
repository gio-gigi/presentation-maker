import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth_context";
import { ADMIN_ROLES } from "../../constants/roles";
import './nav_bar.css';

export const NavBar = () => {
  const { user, logout } = useAuth();
  if (!user) {
    console.log("user not logged in");
    return null;
  }
  const handleLogout = () => {
    logout();
  };
  return (
    <nav className="nav">
      <Link to="/" className="link">Home</Link>
      {ADMIN_ROLES.includes(user.role) && (
        <>
          <Link to="/presentation/maker" className="link">Crear Presentación</Link>
          <Link to="/admin/register" className="link">Registrar un administrador</Link>
        </>
      )}
      <Link onClick={handleLogout} to="/login" className="link">
        Cerrar sesión
      </Link>
    </nav>
  );
};
