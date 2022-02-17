import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Button, Group, Navbar, Title } from "@mantine/core"
import { GoogleLogout } from "react-google-login";
import Logo from "../images/logo.png";
import { GlobalContext } from '../context/GlobalState';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile") || "{}"));
  const { logout } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(navigate);
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile") || "{}"));
    return () => { setUser({}) }
  }, []);

  return (
    <header className="header">
      <div>
        <Avatar radius="xl" src={Logo} alt="Logo"/>
      </div>
      <Title order={2} style={{ color: "#fff" }} className="app-name">Expense Tracker</Title>
      <Group>
        <Avatar
          alt={user?.result?.sub}
          src={user?.result?.picture}
          radius="xl"
          className="avatar"
        />
        <GoogleLogout
          clientId={process.env.REACT_APP_CLIENT_ID}
          buttonText="Logout"
          onLogoutSuccess={handleLogout}
          render={(renderProps) => (
            <Button
              variant="white" color="gray"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              LOG OUT
            </Button>
          )}
        ></GoogleLogout>
      </Group>
    </header>)
};

export default NavBar;
