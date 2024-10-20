import React from "react";
import "./Sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LoginIcon from "@mui/icons-material/Login";
import PollIcon from '@mui/icons-material/Poll';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate(); // ใช้ useNavigate เพื่อเปลี่ยนหน้า
  const token = localStorage.getItem("token"); // ตรวจสอบ token ใน localStorage
  const username = localStorage.getItem("username"); // ดึง username จาก localStorage

  const handleLogout = () => {
    localStorage.removeItem("token"); // ลบ token ออกจาก localStorage
    localStorage.removeItem("username"); // ลบ username ออกจาก localStorage
    navigate("/login"); // เปลี่ยนหน้าไปที่ login
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">logo</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">Main</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>

          <p className="title">List</p>
          <Link to="/ports" style={{ textDecoration: "none" }}>
            <li>
              <TroubleshootIcon className="icon" />
              <span>Portfolio</span>
            </li>
          </Link>
          <Link to="/prediction" style={{ textDecoration: "none" }}>
            <li>
              <TrendingUpIcon className="icon" />
              <span>Prediction</span>
            </li>
          </Link>
          <Link to="/market" style={{ textDecoration: "none" }}>
            <li>
              <PollIcon className="icon" />
              <span>Market</span>
            </li>
          </Link>
          <p className="title">User</p>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>

          {!token && (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <li>
                <LoginIcon className="icon" />
                <span>Login</span>
              </li>
            </Link>
          )}

          {token && (
            <li onClick={handleLogout} style={{ cursor: "pointer" }}>
              <PowerSettingsNewIcon className="icon" />
              <span>Logout</span>
            </li>
          )}
        </ul>
      </div>
      <div className="bottom">
        {token && <p className="username">Logged in as: {username}</p>} 
      </div>
      <div className="colorOption"></div>
      <div className="colorOption"></div>
      <div className="colorOption"></div>
    </div>
  );
}

export default Sidebar;
