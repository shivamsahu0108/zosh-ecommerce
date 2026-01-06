import React from "react";
import DrawerList from "../../components/DrawerList";
import DashboardIcon from "@mui/icons-material/Dashboard";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import { AccountBox, Add, Category, ElectricBolt, Home, LocalOffer, Logout } from "@mui/icons-material";
const menu = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: <DashboardIcon className="text-primary-color" />,
    activeIcon: <DashboardIcon className="text-white" />,
  },
  {
    name: "Coupons",
    path: "/admin/coupons",
    icon: <IntegrationInstructionsIcon className="text-primary-color" />,
    activeIcon: <IntegrationInstructionsIcon className="text-white" />,
  },
  {
    name: "Add New Coupon",
    path: "/admin/add-coupon",
    icon: <Add className="text-primary-color" />,
    activeIcon: <Add className="text-white" />,
  },
  {
    name: "Home page",
    path: "/admin/home-grid",
    icon: <Home className="text-primary-color" />,
    activeIcon: <Home className="text-white" />,
  },
  {
    name: "Electronics Category",
    path: "/admin/electronics-category",
    icon: <ElectricBolt className="text-primary-color" />,
    activeIcon: <ElectricBolt className="text-white" />,
  },
  {
    name: "Shop By Category",
    path: "/admin/shop-by-category",
    icon: <Category className="text-primary-color" />,
    activeIcon: <Category className="text-white" />,
  },
  {
    name: "Deals",
    path: "/admin/deals",
    icon: <LocalOffer className="text-primary-color" />,
    activeIcon: <LocalOffer className="text-white" />,
  },
];
const menu2 = [
  {
    name: "Account",
    path: "/admin/account",
    icon: <AccountBox className="text-primary-color" />,
    activeIcon: <AccountBox className="text-white" />,
  },
  {
    name: "Logout",
    path: "/admin/logout", 
    icon: <Logout className="text-primary-color" />,
    activeIcon: <Logout className="text-white" />,
  }
];
const AdminDrawerList = ({ toggleDrawer }: any) => {
  return <DrawerList menu={menu} menu2={menu2} toggleDrawer={toggleDrawer} />;
};

export default AdminDrawerList;
