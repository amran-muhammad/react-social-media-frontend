import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Breadcrumb } from "antd";
import { useEffect, useState } from "react";
const highliht_link = ({ isActive, isPending }) => {
  return {
    fontWeight: isActive ? "bold" : "",
    color: isActive ? "red" : "black",
  };
};


const AppLayout = () => {
  let [BreadcrumbItems, setBreadcrumbItems] = useState([])
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(()=>{
    if(user){
      setBreadcrumbItems(BreadcrumbItems=[
        {
          title: (
            <NavLink style={highliht_link} to="/about">
              About
            </NavLink>
          ),
        },
        {
          title: (
            <NavLink style={highliht_link} to="/">
              Home
            </NavLink>
          ),
        },
      ])
    }
    else{
      setBreadcrumbItems(BreadcrumbItems=[
        {
          title: (
            <NavLink style={highliht_link} to="/auth/signin">
              Sign in
            </NavLink>
          ),
        },
        {
          title: (
            <NavLink style={highliht_link} to="/auth/signup">
              Sign up
            </NavLink>
          ),
        },
      ])
    }
  },[])
  return (
    <div>
      {user ? (
        <>
          <h1>{user.name}</h1>
          <button
            onClick={() => {
              localStorage.removeItem("user");
              window.location.href = "/auth/signin";
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <h1>No User</h1>

        </>
      )}
      <Breadcrumb
        items={BreadcrumbItems}
      />
      <Outlet />
    </div>
  );
};

export default AppLayout;
