import React from "react";
import ProductList from "../Components/ProductListings/ProductList";
import styled from "styled-components";
const MainWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Mukta", sans-serif;

  div {
    width: 100%;
    max-width: 1600px;
  }
`;

const Home = () => {
  return (
    <MainWrap>
      <div>
        <ProductList />
      </div>
    </MainWrap>
  );
};

export default Home;
