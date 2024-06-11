import { useAuth } from "../AuthProvider";
import { Link } from "react-router-dom";
export default function Header() {
  const auth = useAuth();
  return (
    <>
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <div className="col-md-3 mb-2 mb-md-0">
          <a
            href="/"
            className="d-inline-flex link-body-emphasis text-decoration-none"
          >
            Inicio
          </a>
        </div>

        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <a href="/dashboard" className="nav-link px-2 link-secondary">
              Home
            </a>
          </li>
          <li>
            <Link to={"/products"} className="nav-link px-2 link-secondary">
              Productos
            </Link>
          </li>
        </ul>

        <div className="col-md-3 text-end">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => auth.logOut()}
          >
            Cerrar sesión
          </button>
        </div>
      </header>
    </>
  );
}
