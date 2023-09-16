import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
  MdWallet,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import Bitcoin_address from "views/admin/default_explorer";
import Responsive_explorer from "views/admin/responsive_explorer";
import DataTables from "views/admin/dataTables";
import Search from "views/admin/default/components/SearchPage";

// Auth Imports
import SignInCentered from "views/auth/signIn";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },

  {
    name: "Search",
    layout: "/admin",
    path: "/search",
    icon: <Icon as={MdWallet} width='20px' height='20px' color='inherit' />,
    component: Search,
  },

  
  
];

export default routes;
