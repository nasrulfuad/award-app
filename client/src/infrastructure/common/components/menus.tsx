import {
  PieChartOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import { Link } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

export const navigationWithLink = (
  label: React.ReactNode,
  key: string,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem => {
  return {
    key,
    icon,
    children,
    label: <Link to={key}>{label}</Link>,
    type,
  };
};

export const menus: MenuItem[] = [
  navigationWithLink("Home", "/admin/home", <PieChartOutlined />),
  navigationWithLink("Cards", "/admin/cards", <UnorderedListOutlined />),
  navigationWithLink("Profile", "/admin/profile", <UserOutlined />),
];
