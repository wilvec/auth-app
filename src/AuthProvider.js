import axios from "axios";
import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();

  const loginAction = async (user) => {
    let resp;
    let mensaje;
    try {
      resp = await axios.post(
        `${process.env.REACT_APP_API_EP}users/login`,
        user,
        {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Content-Type": "application/json",
          },
        }
      );
      mensaje = resp.data.mensaje;
    } catch (error) {
      if (error.code || !error.response.status) {
        mensaje = "Error al conectar al servicio de autenticación";
      } else {
        switch (error.response.status) {
          case 503:
            mensaje =
              "El servicio de autenticación no está disponible. Intente más tarde.";
            break;
          default:
            mensaje = "Error al conectar al servicio de autenticación";
            break;
        }
      }
    }

    return new Promise((resolve, reject) => {
      if (!resp) {
        reject({
          token: "",
          mensaje: mensaje,
        });
      } else if (!resp.data.token) {
        reject({
          token: "",
          mensaje: resp.data.mensaje,
        });
      } else {
        setUser(resp.data.dbUser);
        setToken(resp.data.token);
        localStorage.setItem("site", token);
        resolve({
          mensaje: "",
          token: resp.data.token,
        });
      }
    });
  };

  /*const loginAction = (data) => {
    let mensaje = "";
    const message = login(data);
    message.then((e) => {
      if (e.mensaje) {
        mensaje = e.mensaje;
        return mensaje;
      } else {
        setUser(data.username);
        setToken(data.password);
        localStorage.setItem("site", data.password);
        navigate("/dashboard");
      }
    });
  };*/

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

//Hook personalizado
export const useAuth = () => {
  return useContext(AuthContext);
};
