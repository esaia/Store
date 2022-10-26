import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FaCartArrowDown, FaWindowClose } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  filtere_data,
  set_category_name,
  set_filteredData,
} from "../../redux/action/productActions";

import Cartmodal from "./Cartmodal";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

const MainWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #bfc2bd;
  height: 70px;
`;

const Headerdiv = styled.div`
  width: 100%;
  display: flex;
  max-width: 1200px;
`;

const Menudiv = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  font-size: 15px;
  margin-left: 30px;
  text-transform: capitalize;

  h1 {
    cursor: pointer;
    padding: 5px;

    @media only screen and (max-width: 1100px) {
      display: none;
    }

    &:hover,
    &:nth-child(${(props) => props.menuIndex}) {
      background-color: #7bbb5d;
      color: #fff;
    }
  }
`;

const Menuicon = styled.div`
  color: black;
  font-size: 30px;
  cursor: pointer;

  @media only screen and (min-width: 1100px) {
    display: none;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 53;
  transform: translateX(-100%);
  transition: all 0.2s ease-in-out;

  div {
    //header
    &:nth-child(1) {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 100%;
      height: 50px;
      div {
        margin: 0px 20px;
        font-size: 25px;
        cursor: pointer;
      }
    }

    //menu
    &:nth-child(2) {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 25px;
      margin: 20px;
      h2 {
        font-size: 20px;
        border: 1px solid black;
        cursor: pointer;
        padding: 20px;

        &:hover {
          background-color: #7bbb5d;
        }
      }
    }
  }
`;
const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  img {
    width: 60px;
    cursor: pointer;
    width: 50px;
  }
`;

const Details = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  font-size: 20px;
  cursor: pointer;
  margin-right: 30px;
  position: relative;

  span {
    position: absolute;
    top: 5px;
    right: -10px;
    background-color: #7bbb5d;
    padding: 8px;
    width: 1px;
    height: 1px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    color: white;
  }
`;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: ${(props) => props.height};
  top: 70px;
  left: 0;
  background-color: rgba(0, 0, 0, 0.703);
  z-index: 51;
`;

const Header = () => {
  const [showCart, setshowCart] = useState(false);
  const [menuIndex, setmenuIndex] = useState(1);
  const menuref = useRef();
  let navigate = useNavigate();
  const products = useSelector((state) => state.Allproduct.products);
  const cartItems = useSelector((state) => state.cartProducts);
  const dispatch = useDispatch();

  const cagegories = [
    "all",
    "men's clothing",
    "jewelery",
    "electronics",
    "women's clothing",
  ];

  const handleClick = (item, i) => {
    setmenuIndex(i + 1);
    dispatch(set_category_name(i + 1));
    dispatch(set_filteredData({ products }));
    dispatch(filtere_data(item));
    navigate("/");

    menuref.current.style.transform = "translateX(-100%)";

    if (item === "all") {
      navigate("/");
      window.location.reload();
      menuref.current.style.transform = "translateX(-100%)";
      return dispatch(set_filteredData({ products }));
    }
  };
  useEffect(() => {
    dispatch(set_filteredData({ products }));
  }, [products]);

  const height = Math.max(
    document.body.getBoundingClientRect().height,
    document.documentElement.getBoundingClientRect().height
  );

  const showMobileMenu = () => {
    menuref.current.style.transform = "translateX(0%)";
  };

  const HideMobileMenu = () => {
    menuref.current.style.transform = "translateX(-100%)";
  };
  return (
    <MainWrap>
      {showCart && (
        <Overlay
          onClick={() => setshowCart(!showCart)}
          height={height - 70 + "px"}
        ></Overlay>
      )}
      <Headerdiv>
        <Menudiv menuIndex={menuIndex}>
          {cagegories.map((item, i) => {
            return (
              <h1 key={item} onClick={() => handleClick(item, i)}>
                {item}
              </h1>
            );
          })}

          <Menuicon onClick={showMobileMenu}>
            <MdMenu />
          </Menuicon>

          <MobileMenu ref={menuref}>
            <div>
              <div onClick={HideMobileMenu}>
                <FaWindowClose />
              </div>
            </div>

            <div>
              {cagegories.map((item, i) => {
                return (
                  <h2 key={item} onClick={() => handleClick(item, i)}>
                    {item}
                  </h2>
                );
              })}
            </div>
          </MobileMenu>
        </Menudiv>
        <a href="/">
          <Logo>
            <img
              src="https://img.freepik.com/premium-vector/abstract-modern-ecommerce-logo-design-colorful-gradient-shopping-bag-logo-template_467913-995.jpg?w=2000"
              alt=""
            />
          </Logo>
        </a>

        <Details>
          <FaCartArrowDown onClick={() => setshowCart(!showCart)} />
          <span>{cartItems.length}</span>
          {showCart && <Cartmodal />}
        </Details>
      </Headerdiv>
    </MainWrap>
  );
};

export default Header;
