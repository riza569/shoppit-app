import { useEffect, useState } from "react";
import CardContainer from "../components/Home/CardContainer";
import Header from "../components/Home/Header";

import Spinner from "../components/ui/Spinner";
import { randomValue } from "../lib/GenerateCartCode";
import { apiFetch } from "../lib/api";

const Home = () => {
  const [products, setproducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("cart_code") == null) {
      localStorage.setItem("cart_code", randomValue);
    }
  }, []);

  useEffect(() => {
    apiFetch("products")
      .then((res) => res.json())
      .then((data) => {
        setproducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <Header />
      {loading ? <Spinner /> : <CardContainer products={products} />}
    </div>
  );
};

export default Home;
