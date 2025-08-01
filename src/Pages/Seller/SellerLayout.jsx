import React from "react";
import { useAppContext } from "../../Context/AppContext";
import { assets } from "../../assets/assets";
import { Link, NavLink, Outlet } from "react-router-dom";
const SellerLayout = () => {
  const { setSeller } = useAppContext();

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: assets.add_icon },
    {
      name: "Product List",
      path: "/seller/product-list",
      icon: assets.product_list_icon,
    },
    { name: "Order", path: "/seller/orders", icon: assets.order_icon },
  ];
  const logout = async () => {
    setSeller(false);
  };
  return (
    <>
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white ">
        <Link to="/">
          <img
            src={assets.logo}
            alt="logo"
            className="cursor-pointer w-34 md:w-38"
          />
        </Link>
        <div className="flex items-center gap-5 text-gray-500">
          <p>Hi! Admin</p>
          <button
            onClick={logout}
            className="border rounded-full text-sm cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull text-white font-semibold "
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex">
        <div className="md:w-64 w-16 border-r h-[95vh] text-base border-gray-300 pt-4 flex flex-col ">
          {sidebarLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.name} end={item.path === "/seller"}
              className={({isActive})=>`flex items-center py-3 px-4 gap-3 
            ${
           isActive
            ? "border-r-4 md:border-r-[6px] bg-primary/10 border-primary text-primary"
            : "hover:bg-gray-100/90 border-white text-gray-700"
            }`}
            >
             <img src={item.icon} alt=""className="w-7 h-7" />
              <p className="md:block hidden text-center">{item.name}</p>
            </NavLink>
          ))}
        </div>
        <Outlet/>
      </div>
    </>
  );
};
export default SellerLayout;
