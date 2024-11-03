import AdminsSvg from "../public/navigation-bar-svg/svgAdmins";
import CategoriesSvg from "../public/navigation-bar-svg/svgCategories";
import DashboardSvg from "../public/navigation-bar-svg/svgDashboard";
import LogOutSvg from "../public/navigation-bar-svg/svgLogOut";
import OrdersSvg from "../public/navigation-bar-svg/svgOrders";
import ProductSvg from "../public/navigation-bar-svg/svgProduct";
import SettingsSvg from "../public/navigation-bar-svg/svgSettings";
import Link from "next/link";
import React from "react";

const NavigationBar = () => {
  return (
    <div className="flex flex-col gap-5 pt-5 pl-5 pr-5 bg-[#DEB038] h-screen">
      <div className="flex flex-row items-center gap-2">
        <DashboardSvg />
        <Link href={"/dashboard"}>
          <span>Dashboard</span>
        </Link>
      </div>
      <div className="flex flex-row items-center gap-2">
        <ProductSvg />
        <Link href={"/products"}>
          <span>Products</span>
        </Link>
      </div>
      <div className="flex flex-row items-center gap-2">
        <CategoriesSvg />
        <Link href={"/categories"}>
          <span>Categories</span>
        </Link>
      </div>
      <div className="flex flex-row items-center gap-2">
        <OrdersSvg />
        <Link href={"/notImplemented"}>
          <span>Orders</span>
        </Link>
      </div>
      <div className="flex flex-row items-center gap-2">
        <AdminsSvg />
        <Link href={"/product"}>
          <span>Admins</span>
        </Link>
      </div>
      <div className="flex flex-row items-center gap-2">
        <SettingsSvg />
        <Link href={"/product"}>
          <span>Settings</span>
        </Link>
      </div>
      <div className="flex flex-row items-center gap-2">
        <LogOutSvg />
        <Link href={"/product"}>
          <span>Log Out</span>
        </Link>
      </div>
    </div>
  );
};

export default NavigationBar;
