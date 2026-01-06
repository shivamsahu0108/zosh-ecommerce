import {
  Avatar,
  Box,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import {
  AddShoppingCart,
  FavoriteBorder,
  Storefront,
} from "@mui/icons-material";
import CategorySheet from "./CategorySheet";
import { mainCategory } from "./../../../data/category/mainCategory";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../State/Store";

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const [showSheet, setShowSheet] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("men");
  const { auth } = useAppSelector((state) => state);

  return (
    <div>
      <Box className="sticky top-0 left-0 right-0 bg-white" sx={{ zIndex: 2 }}>
        <div className="flex items-center justify-between px-5 lg:px-20 h-[70px] border-b">
          <div className="flex items-center gap-9">
            <div className="flex items-center gap-2">
              {!isLarge && (
                <IconButton>
                  <MenuIcon />
                </IconButton>
              )}
              <h1
                className="logo cursor-pointer text-lg md:text-2xl text-primary-color"
                onClick={() => {
                  navigate("/");
                }}
              >
                Zosh Bazzar
              </h1>
            </div>
            <ul className="flex items-center font-medium text-gray-800">
              {mainCategory.map((item) => {
                return (
                  <li
                    onMouseLeave={() => setShowSheet(false)}
                    onMouseEnter={() => {
                      setShowSheet(true);
                      setSelectedCategory(item.categoryId);
                    }}
                    key={item.name}
                    className="mainCategory hover:text-primary-color hover:border-b-2 h-[70px] px-4 border-primary-color flex items-center"
                  >
                    {item.name}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex gap-1 lg:gap-6 items-center">
            <IconButton>
              <SearchIcon />
            </IconButton>
            {auth.user ? (
              <Button
                className="flex items-center gap-2"
                onClick={() => {
                  navigate("/account");
                }}
              >
                <Avatar
                  sx={{ width: 29, height: 29 }}
                  src="https://cdn.pixabay.com/photo/2015/04/15/09/28/head-723540_640.jpg"
                />
                <h1 className="font-medium hidden lg:block normal-case">
                  {auth.user?.fullName || "User"}
                </h1>
              </Button>
            ) : (
              <Button variant="contained" onClick={() => navigate("/login")}>
                Login
              </Button>
            )}
            <IconButton onClick={() => navigate("/wishlist")}>
              <FavoriteBorder sx={{ fontSize: 29 }} />
            </IconButton>
            <IconButton>
              <AddShoppingCart
                onClick={() => navigate("/cart")}
                sx={{ fontSize: 29 }}
                className="text-gray-700"
              />
            </IconButton>
            {isLarge && (
              <Button
                startIcon={<Storefront />}
                variant="outlined"
                onClick={() => navigate("/become-seller")}
              >
                Become Seller
              </Button>
            )}
          </div>
        </div>
        {showSheet && (
          <div
            className="categorySheet absolute top-[4.41rem] left-20 right-20 border"
            onMouseLeave={() => setShowSheet(false)}
            onMouseEnter={() => setShowSheet(true)}
          >
            <CategorySheet selectedCategory={selectedCategory} />
          </div>
        )}
      </Box>
    </div>
  );
};

export default Navbar;
