import { Link } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import Header from "./Header";

const Dashboard = () => {
  const auth = useAuth();
  return (
    <div className="container">
      <Header />
      <div>
        <h1>Bienvenido! {auth.user.name}</h1>
        <div>
          <Link to={"/products"}>Productos</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
