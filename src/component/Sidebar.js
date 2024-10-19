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

  const handleLogout = () => {
    localStorage.removeItem("token"); // ลบ token ออกจาก localStorage
    navigate("/login"); // เปลี่ยนหน้าไปที่ login
  };

  const token = localStorage.getItem("token"); // ตรวจสอบ token ใน localStorage

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
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>

          {/* แสดง Login li เฉพาะเมื่อไม่มี token */}
          {!token && (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <li>
                <LoginIcon className="icon" />
                <span>Login</span>
              </li>
            </Link>
          )}

          {/* แสดง Lockout li เฉพาะเมื่อมี token */}
          {token && (
            <li onClick={handleLogout} style={{ cursor: "pointer" }}>
              <PowerSettingsNewIcon className="icon" />
              <span>Lockout</span>
            </li>
          )}
        </ul>
      </div>
      <div className="bottom"></div>
      <div className="colorOption"></div>
      <div className="colorOption"></div>
      <div className="colorOption"></div>
    </div>
  );
}

export default Sidebar;
