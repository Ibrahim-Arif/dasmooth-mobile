import {
  PieChartOutlined,
  TeamOutlined,
  LoginOutlined,
  DeleteOutlined,
  SettingOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { Badge } from "antd";

const getItem = (label, key, icon, children) => {
  return {
    key,
    icon,
    children,
    label,
  };
};

export const menuItems = (notificationCount) => [
  getItem("Dashboard", "dashboard", <PieChartOutlined />),
  getItem(
    "Notifications",
    "notifications",
    <Badge count={notificationCount}>
      <BellOutlined />
    </Badge>
  ),
  getItem("Profile Settings", "profile", <SettingOutlined />),
  getItem("Team Members", "team", <TeamOutlined />),
  getItem("Deleted Batons", "delete", <DeleteOutlined />),
  getItem(
    "Logout",
    "logout",

    <LoginOutlined />
  ),
];
