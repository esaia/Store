import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SingleProduct from "./pages/SingleProduct";
import Header from "./Components/header/Header";
import "./App.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setProducts } from "./redux/action/productActions";
import axios from "axios";

import { GoMarkGithub } from "react-icons/go";
import styled from "styled-components";

function App() {
  const dispatch = useDispatch();

  const fetchdata = () => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => dispatch(setProducts(response.data)));
  };
  useEffect(() => {
    fetchdata();
  }, []);

  const License = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px 0px;
    gap: 5px;
    a {
      &:hover {
        color: greenyellow;
      }
    }
  `;

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/singleProduct/:ID" element={<SingleProduct />} />
      </Routes>
      <License>
        <p>created by Esaia </p>
        <a href="https://github.com/esaia/Store" target="_blank">
          <GoMarkGithub />
        </a>
      </License>
    </BrowserRouter>
  );
}

export default App;
