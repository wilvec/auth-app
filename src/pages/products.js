import Header from "../components/Header";
import { useAuth } from "../AuthProvider";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Products() {
  const auth = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_EP}products`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Content-Type": "application/json",
          Authorization: auth.token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [auth.token]);

  return (
    <>
      <Header></Header>
      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row">
            {products.map((product) => (
              <div key={product.idproducts} className="col-md-4">
                <div className="card mb-4 box-shadow">
                  <img
                    className="card-img-top"
                    src={product.image}
                    width={50}
                    height={100}
                    alt="Producto"
                  />
                  <div className="card-body">
                    <p className="card-text">{product.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
