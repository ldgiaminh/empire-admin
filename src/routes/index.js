import React from "react"
import { Redirect } from "react-router-dom"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

// Dashboard
import Dashboard from "../pages/Dashboard/index"

//Booking
import Booking from "../pages/Booking/index"
import BookingDetails from "../pages/Booking/Details/BookingDetails"
import QrScanner from "pages/Booking/QrScanner"

//Order Service
import OrderService from "../pages/OrderServices/index"
import OrderServiceDetail from "pages/OrderServices/Details/OrderServiceDetail"

//Transaction
import Transaction from "../pages/Transaction/index"

//User
import UserLists from "../pages/User/index"

//Car brand
import CarBrand from "../pages/CarBrand/index"

//Symptom
import SymptomLists from "../pages/Symptom/index"

//Group Service
import GroupService from "../pages/GroupService/index"

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },

  //booking
  { path: "/booking", component: Booking },
  { path: "/booking-detail/:id", component: BookingDetails },
  { path: "/scanner", component: QrScanner },

  //order service
  { path: "/order-service", component: OrderService },
  { path: "/order-service-detail/:id", component: OrderServiceDetail },

  //transaction
  { path: "/transactions", component: Transaction },

  //symptom
  { path: "/symptoms", component: SymptomLists },

  //group-service
  { path: "/service-list", component: GroupService },

  //user
  { path: "/users", component: UserLists },

  //Vehicle
  { path: "/car-brand", component: CarBrand },

  // //profile
  { path: "/profile", component: UserProfile },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
]

export { publicRoutes, authProtectedRoutes }
