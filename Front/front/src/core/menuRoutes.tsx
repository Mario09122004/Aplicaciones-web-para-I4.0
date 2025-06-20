import UserForm from "../modules/user/UserForm";
import Dashboard from "../modules/dashboard/Dashboard";
import TableModule from "./../modules/user/UserList";
import ProductList from "../modules/product/ProductList";
import OrderList from "../modules/order/OrderList";
import React, { type JSX } from "react";

export interface AppRoute {
    path: string;
    element: JSX.Element;
    label?: string;
    icon?: string;
}

const routes: AppRoute[] = [
    {
        path: "/",
        element: <UserForm/>, // Placeholder for Dashboard component
        label: "Inicio",
        icon: "HomeOutlined",
    },
    {
        path: "/dashboard",
        element: <Dashboard />, // Placeholder for Dashboard component
        label: "Dashboard",
        icon: "DashboardOutlined",
    },
    {
        path: "/users",
        element: <TableModule />, // Placeholder for UserList component
        label: "Usuarios",
        icon: "UserOutlined",
    },
    {
        path: "/products",
        element: <ProductList />, // Placeholder for ProductList component
        label: "Productos",
        icon: "AppstoreOutlined",
    },
    {
        path: "/orders",
        element: <OrderList />, // Placeholder for OrderList component
        label: "Pedidos",
        icon: "ShoppingCartOutlined",
    },
]

export default routes;