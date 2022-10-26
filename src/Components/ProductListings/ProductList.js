import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { set_filteredData } from "../../redux/action/productActions";
import styled from "styled-components";
import Pagination from "./Pagination";
import SingleProduct from "./SingleProduct";

const MainwWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const CategoryName = styled.h1`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  div {
    display: flex;
    justify-content: center;
    font-size: 35px;
    width: 100%;
    padding: 20px 25px;
  }
`;
const ProductsList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 24%);
  justify-content: center;
  row-gap: 30px;
  column-gap: 30px;
  max-width: 1100px !important;
  @media only screen and (max-width: 1250px) {
    grid-template-columns: repeat(3, 28%);
  }

  @media only screen and (max-width: 910px) {
    grid-template-columns: repeat(2, 35%);
  }

  @media only screen and (max-width: 580px) {
    grid-template-columns: repeat(2, 45%);
    column-gap: 30px;
  }
`;

const ProductList = () => {
  const [itemPerPage] = useState(12);
  const [activePage, setactivePage] = useState(0);
  const products = useSelector((state) => state.Allproduct.products);
  const filteredProducts = useSelector((state) => state.filtereData.products);
  const category = useSelector((state) => state.categoryName);
  const dispatch = useDispatch();

  useEffect(() => {
    setactivePage(0);
  }, [filteredProducts]);

  // pagination
  const pagenumbers = filteredProducts.length / itemPerPage;
  const firstitem = activePage * itemPerPage;
  const lastitem = firstitem + itemPerPage;

  const productsperpage = filteredProducts?.slice(firstitem, lastitem);
  return (
    <MainwWrap>
      <CategoryName>
        <div>{category}</div>
      </CategoryName>

      <ProductsList>
        {productsperpage.length === 0 ? (
          <h1>Loading...</h1>
        ) : (
          productsperpage?.map((item, i) => {
            return <SingleProduct item={item} key={i} />;
          })
        )}
      </ProductsList>

      <Pagination
        pagenumbers={pagenumbers}
        activePage={activePage}
        setactivePage={setactivePage}
      />
    </MainwWrap>
  );
};

export default ProductList;
