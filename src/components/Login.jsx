import { useState } from "react";
import { useAuth } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import "./Login.css";
const Login = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [loginBtnState, setLoginBtnState] = useState(false);

  const [mensaje, setMensaje] = useState("");
  const auth = useAuth();
  const handleSubmitEvent = (e) => {
    e.preventDefault();
    setLoginBtnState(true);

    if (input.username !== "" && input.password !== "") {
      setMensaje(<div className="loader"></div>);
      auth
        .loginAction(input)
        .then((res) => {
          navigate("/dashboard");
        })
        .catch((err) => {
          setMensaje(err.mensaje);
        });
    } else {
      setMensaje("El usuario y la contraseña es obligatorio");
    }
    setLoginBtnState(false);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div id="formContent">
      <div>{mensaje}</div>
      <form onSubmit={handleSubmitEvent}>
        <input
          type="text"
          id="login"
          className="fadeIn second"
          name="username"
          placeholder="Username"
          onChange={handleInput}
        />
        <input
          type="password"
          id="password"
          className="fadeIn third"
          name="password"
          placeholder="password"
          onChange={handleInput}
        />
        <input
          type="submit"
          className="fadeIn fourth"
          value="Ingresar"
          disabled={loginBtnState}
        />
      </form>
    </div>
  );
};

export default Login;
