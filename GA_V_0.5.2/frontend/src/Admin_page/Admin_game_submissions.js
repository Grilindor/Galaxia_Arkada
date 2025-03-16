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
} from "../styles/Admin_SC";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
} from "../styles/Admin_users_sc";
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
import poubelle from "../image/poubelle.png";

const userData = [
  {
    id: 1,
    "Développeur / Développeuse": "marine",
    email: "user1@example.com",
    jeux: "the_beggar_king",
    genres: "action",
    lastLog: "2025-01-15 14:35:20",
  },
  {
    id: 2,
    "Développeur / Développeuse": "Marc",
    email: "user2@example.com",
    jeux: "Neon Strider",
    genres: "action",
    lastLog: "2025-01-14 09:20:10",
  },
  {
    id: 3,
    "Développeur / Développeuse": "enculée",
    email: "user3@example.com",
    jeux: "Lynox le Gardien",
    genres: "action",
    lastLog: "2025-01-13 17:42:45",
  },
  {
    id: 1,
    "Développeur / Développeuse": "marine",
    email: "user1@example.com",
    jeux: "the_beggar_king",
    genres: "action",
    lastLog: "2025-01-15 14:35:20",
  },
  {
    id: 2,
    "Développeur / Développeuse": "Marc",
    email: "user2@example.com",
    jeux: "Neon Strider",
    genres: "action",
    lastLog: "2025-01-14 09:20:10",
  },
  {
    id: 3,
    "Développeur / Développeuse": "enculée",
    email: "user3@example.com",
    jeux: "Lynox le Gardien",
    genres: "action",
    lastLog: "2025-01-13 17:42:45",
  },
  {
    id: 1,
    "Développeur / Développeuse": "marine",
    email: "user1@example.com",
    jeux: "the_beggar_king",
    genres: "action",
    lastLog: "2025-01-15 14:35:20",
  },
  {
    id: 2,
    "Développeur / Développeuse": "Marc",
    email: "user2@example.com",
    jeux: "Neon Strider",
    genres: "action",
    lastLog: "2025-01-14 09:20:10",
  },
  {
    id: 3,
    "Développeur / Développeuse": "enculée",
    email: "user3@example.com",
    jeux: "Lynox le Gardien",
    genres: "action",
    lastLog: "2025-01-13 17:42:45",
  },
  {
    id: 1,
    "Développeur / Développeuse": "marine",
    email: "user1@example.com",
    jeux: "the_beggar_king",
    genres: "action",
    lastLog: "2025-01-15 14:35:20",
  },
  {
    id: 2,
    "Développeur / Développeuse": "Marc",
    email: "user2@example.com",
    jeux: "Neon Strider",
    genres: "action",
    lastLog: "2025-01-14 09:20:10",
  },
  {
    id: 3,
    "Développeur / Développeuse": "enculée",
    email: "user3@example.com",
    jeux: "Lynox le Gardien",
    genres: "action",
    lastLog: "2025-01-13 17:42:45",
  },
  {
    id: 1,
    "Développeur / Développeuse": "marine",
    email: "user1@example.com",
    jeux: "the_beggar_king",
    genres: "action",
    lastLog: "2025-01-15 14:35:20",
  },
  {
    id: 2,
    "Développeur / Développeuse": "Marc",
    email: "user2@example.com",
    jeux: "Neon Strider",
    genres: "action",
    lastLog: "2025-01-14 09:20:10",
  },
  {
    id: 3,
    "Développeur / Développeuse": "enculée",
    email: "user3@example.com",
    jeux: "Lynox le Gardien",
    genres: "action",
    lastLog: "2025-01-13 17:42:45",
  },
  {
    id: 1,
    "Développeur / Développeuse": "marine",
    email: "user1@example.com",
    jeux: "the_beggar_king",
    genres: "action",
    lastLog: "2025-01-15 14:35:20",
  },
  {
    id: 2,
    "Développeur / Développeuse": "Marc",
    email: "user2@example.com",
    jeux: "Neon Strider",
    genres: "action",
    lastLog: "2025-01-14 09:20:10",
  },
  {
    id: 3,
    "Développeur / Développeuse": "enculée",
    email: "user3@example.com",
    jeux: "Lynox le Gardien",
    genres: "action",
    lastLog: "2025-01-13 17:42:45",
  },
  {
    id: 1,
    "Développeur / Développeuse": "marine",
    email: "user1@example.com",
    jeux: "the_beggar_king",
    genres: "action",
    lastLog: "2025-01-15 14:35:20",
  },
  {
    id: 2,
    "Développeur / Développeuse": "Marc",
    email: "user2@example.com",
    jeux: "Neon Strider",
    genres: "action",
    lastLog: "2025-01-14 09:20:10",
  },
  {
    id: 3,
    "Développeur / Développeuse": "enculée",
    email: "user3@example.com",
    jeux: "Lynox le Gardien",
    genres: "action",
    lastLog: "2025-01-13 17:42:45",
  },
  {
    id: 1,
    "Développeur / Développeuse": "marine",
    email: "user1@example.com",
    jeux: "the_beggar_king",
    genres: "action",
    lastLog: "2025-01-15 14:35:20",
  },
  {
    id: 2,
    "Développeur / Développeuse": "Marc",
    email: "user2@example.com",
    jeux: "Neon Strider",
    genres: "action",
    lastLog: "2025-01-14 09:20:10",
  },
  {
    id: 3,
    "Développeur / Développeuse": "enculée",
    email: "user3@example.com",
    jeux: "Lynox le Gardien",
    genres: "action",
    lastLog: "2025-01-13 17:42:45",
  },
];

const AdminPagegamesubmissions = () => {
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
            <Link
              to="/adminPage/user"
              style={{
                display: "flex",
                alignitems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <img
                src={user}
                alt="Dashboard Icon"
                style={{ width: "16px", marginRight: "8px" }}
              />
              Users
            </Link>
          </SidebarItem>
          <SidebarItem>
            <Link
              to="/adminPage/Game_submissions"
              style={{
                display: "flex",
                alignitems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <img
                src={game}
                alt="Dashboard Icon"
                style={{ width: "16px", marginRight: "8px" }}
              />
              Game Submissions
            </Link>
          </SidebarItem>
          <SidebarItem>
            <Link
              to="/adminPage/produits"
              style={{
                display: "flex",
                alignitems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <img
                src={produits}
                alt="Dashboard Icon"
                style={{ width: "16px", marginRight: "8px" }}
              />
              Products
            </Link>
          </SidebarItem>
          <SidebarItem as="h3">USEFUL</SidebarItem>
          <SidebarItem>
            <Link
              to="/adminPage/stats"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <img
                src={stats}
                alt="Dashboard Icon"
                style={{ width: "16px", marginRight: "8px" }}
              />
              Stats
            </Link>
          </SidebarItem>
          <SidebarItem>
            <Link
              to="/adminPage/notifications"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <img
                src={notifications}
                alt="Dashboard Icon"
                style={{ width: "16px", marginRight: "8px" }}
              />
              Notifications
            </Link>
          </SidebarItem>
          <SidebarItem as="h3">Services</SidebarItem>
          <SidebarItem>
            <Link
              to="/adminPage/logs"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <img
                src={logs}
                alt="Dashboard Icon"
                style={{ width: "16px", marginRight: "8px" }}
              />
              Logs
            </Link>
          </SidebarItem>
          <SidebarItem>
            <Link
              to="/adminPage/Settings"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <img
                src={Settings}
                alt="Dashboard Icon"
                style={{ width: "16px", marginRight: "8px" }}
              />
              Settings
            </Link>
          </SidebarItem>
          <SidebarItem as="h3">Users</SidebarItem>
          <SidebarItem>
            <Link
              to="/adminPage/Profile"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <img
                src={user}
                alt="Dashboard Icon"
                style={{ width: "16px", marginRight: "8px" }}
              />
              Profile
            </Link>
          </SidebarItem>
          <SidebarItem>
            <Link
              to="/home"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <img
                src={logout}
                alt="Dashboard Icon"
                style={{ width: "16px", marginRight: "8px" }}
              />
              Logout
            </Link>
          </SidebarItem>
        </Sidebar>
        <MainContent>
          <SectionTitle>Game_submissions</SectionTitle>
          <Table>
            <thead>
              <tr>
                <TableHeader>Développeur / Développeuse</TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader>Nom du jeux </TableHeader>
                <TableHeader>Genres</TableHeader>
                <TableHeader>Last mise à jour</TableHeader>
                <TableHeader>DELETE</TableHeader>
              </tr>
            </thead>
            <tbody>
              {userData.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user["Développeur / Développeuse"]}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.jeux}</TableCell>
                  <TableCell>{user.genres}</TableCell>
                  <TableCell>{user.lastLog}</TableCell>
                  <img
                    src={poubelle}
                    alt="Dashboard Icon"
                    style={{ width: "27px", marginRight: "12px" }}
                  />
                </TableRow>
              ))}
            </tbody>
          </Table>
        </MainContent>
      </Content>
    </AdminContainer>
  );
};

export default AdminPagegamesubmissions;
