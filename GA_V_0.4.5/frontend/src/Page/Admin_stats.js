import React from "react";
import {
  AdminContainer,
  Header,
  Content,
  Sidebar,
  SidebarItem,
  MainContent,
  SectionTitle,
  Logo,
} from "../styles/Admin_stats_SC";
import logo from "../image/logo_1.png";
import dashboard from "../image/dashboard.png";
import user from "../image/users.png";
import game from "../image/game.png";
import produits from "../image/produit.png";
import stats from "../image/stats.png";
import notifications from "../image/notification.png";
import logs from "../image/logs.png";
import Settings from "../image/settings.png";
import logout from "../image/logouts.png";
import { Link } from "react-router-dom";

const AdminPagestats = () => {
  return (
    <AdminContainer>
      <Header>
        <Logo>
          <img src={logo} alt="Logo" />
          <h1
            style={{ marginLeft: "10px", fontSize: "1.5em", color: "orange" }}
          >
            Galaxia Arkada
          </h1>
        </Logo>
      </Header>
      <Content>
        <Sidebar>
          <SidebarItem as="h3">MAIN</SidebarItem>
          <SidebarItem>
            <Link
              to="/adminPage"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <img
                src={dashboard}
                alt="Dashboard Icon"
                style={{ width: "16px", marginRight: "8px" }}
              />
              Dashboard
            </Link>
          </SidebarItem>
          <SidebarItem as="h3">LIST</SidebarItem>
          <SidebarItem>
            <img
              src={user}
              alt="Dashboard Icon"
              style={{ width: "16px", marginRight: "8px" }}
            />
            Users
          </SidebarItem>
          <SidebarItem>
            <img
              src={game}
              alt="Dashboard Icon"
              style={{ width: "16px", marginRight: "8px" }}
            />
            Game Submissions
          </SidebarItem>
          <SidebarItem>
            <img
              src={produits}
              alt="Dashboard Icon"
              style={{ width: "16px", marginRight: "8px" }}
            />
            Products
          </SidebarItem>
          <SidebarItem as="h3">USEFUL</SidebarItem>
          <SidebarItem>
            <img
              src={stats}
              alt="Dashboard Icon"
              style={{ width: "16px", marginRight: "8px" }}
            />
            Stats
          </SidebarItem>
          <SidebarItem>
            <img
              src={notifications}
              alt="Dashboard Icon"
              style={{ width: "16px", marginRight: "8px" }}
            />
            Notifications
          </SidebarItem>
          <SidebarItem as="h3">Services</SidebarItem>
          <SidebarItem>
            <img
              src={logs}
              alt="Dashboard Icon"
              style={{ width: "16px", marginRight: "8px" }}
            />
            Logs
          </SidebarItem>
          <SidebarItem>
            <img
              src={Settings}
              alt="Dashboard Icon"
              style={{ width: "16px", marginRight: "8px" }}
            />
            Settings
          </SidebarItem>
          <SidebarItem as="h3">Users</SidebarItem>
          <SidebarItem>
            <img
              src={user}
              alt="Dashboard Icon"
              style={{ width: "16px", marginRight: "8px" }}
            />
            Profile
          </SidebarItem>
          <SidebarItem>
            <img
              src={logout}
              alt="Dashboard Icon"
              style={{ width: "16px", marginRight: "8px" }}
            />
            Logout
          </SidebarItem>
        </Sidebar>
        <MainContent>
          <SectionTitle>Welcome, Admin</SectionTitle>
        </MainContent>
      </Content>
    </AdminContainer>
  );
};

export default AdminPagestats;
