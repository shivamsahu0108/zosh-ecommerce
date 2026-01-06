import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import { useAppDispatch } from "../State/Store";
import { logout } from "../State/AuthSlice";
interface menuItem {
  name: string;
  path: string;
  icon: any;
  activeIcon: any;
}
interface DrawerListProps {
  menu: menuItem[];
  menu2: menuItem[];
  toggleDrawer: () => void;
}
const DrawerList = ({ menu, menu2, toggleDrawer }: DrawerListProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  return (
    <div className="h-full">
      <div className="flex flex-col justify-between h-full w-[300px] border-r py-5">
        <div className="space-y-2">
          {menu.map((item, index: number) => (
            <div
              className="pr-9 cursor-pointer"
              key={index}
              onClick={() => navigate(item.path)}
            >
              <div
                className={`${
                  location.pathname === item.path
                    ? "bg-primary-color text-white"
                    : "text-primary-color"
                } flex items-center px-5 py-3 rounded-r-full`}
              >
                <ListItemIcon>
                  {location.pathname === item.path
                    ? item.activeIcon
                    : item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </div>
            </div>
          ))}
        </div>
        <Divider />
        <div className="space-y-2">
          {menu2.map((item, index: number) => (
            <div
              className="pr-9 cursor-pointer"
              key={index}
              onClick={() => {
                navigate(item.path);
                if (item.path === "/") {
                  handleLogout();
                }
              }}
            >
              <div
                className={`${
                  location.pathname === item.path
                    ? "bg-primary-color text-white"
                    : "text-primary-color"
                } flex items-center px-5 py-3 rounded-r-full`}
              >
                <ListItemIcon>
                  {location.pathname === item.path
                    ? item.activeIcon
                    : item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DrawerList;
