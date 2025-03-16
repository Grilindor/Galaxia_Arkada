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
import logo from "../image/logo_1.png";
import dashboard from "../image/dashboard.png";
import user from "../image/users.png";
import game from "../image/game.png";
import produits from "../image/produit.png";
import stats from "../image/stats.png";
import notificationsIcon from "../image/notification.png";
import logs from "../image/logs.png";
import Settings from "../image/settings.png";
import logout from "../image/logouts.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const AdminPagenotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [form, setForm] = useState({
    title: "",
    message: "",
    type: "info",
    target: "",
    sendDate: "",
  });

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const response = await axios.get("/api/notifications");
    setNotifications(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/notifications", form);
    fetchNotifications();
    setForm({ title: "", message: "", type: "info", target: "", sendDate: "" });
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/notifications/${id}`);
    fetchNotifications();
  };

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
                src={notificationsIcon}
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
          <SectionTitle>Notifications</SectionTitle>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Titre"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <textarea
              placeholder="Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
            <input
              type="text"
              placeholder="Cible (all, user123)"
              value={form.target}
              onChange={(e) => setForm({ ...form, target: e.target.value })}
            />
            <input
              type="datetime-local"
              value={form.sendDate}
              onChange={(e) => setForm({ ...form, sendDate: e.target.value })}
            />
            <button type="submit">Créer Notification</button>
          </form>

          {/* Liste des notifications */}
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Titre</th>
                <th>Message</th>
                <th>Type</th>
                <th>Cible</th>
                <th>Date d'envoi</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((notif) => (
                <tr key={notif.id}>
                  <td>{notif.id}</td>
                  <td>{notif.title}</td>
                  <td>{notif.message}</td>
                  <td>{notif.type}</td>
                  <td>{notif.target}</td>
                  <td>{notif.sendDate}</td>
                  <td>
                    <button onClick={() => handleDelete(notif.id)}>
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </MainContent>
      </Content>
    </AdminContainer>
  );
};

export default AdminPagenotifications;
