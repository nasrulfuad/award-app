import { UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu } from "antd";
import {
  menus,
  navigationWithLink,
} from "infrastructure/common/components/menus";
import { useAuth } from "infrastructure/hooks/useAuth";
import { useState } from "react";
import { useLocation } from "react-router";

const { Header, Content, Sider, Footer } = Layout;

const AdminLayout: React.FC = ({ children }) => {
  const [state, setState] = useState({
    collapsed: false,
    spaceContent: 200,
  });

  const location = useLocation();
  const { logout, email } = useAuth();

  const onCollapse = (collapsed: boolean, type: string) => {
    setState({
      collapsed,
      spaceContent: !collapsed ? 200 : 0,
    });
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        id="sider"
        collapsible
        breakpoint="xxl"
        collapsedWidth="0"
        onCollapse={onCollapse}
        collapsed={state.collapsed}
      >
        <h1 className="logo">Award App</h1>
        <Menu
          theme="dark"
          defaultSelectedKeys={[location.pathname]}
          mode="inline"
          items={menus}
        />
      </Sider>
      <Header id="header">
        <Dropdown
          overlay={
            <Menu
              items={[
                navigationWithLink("Profile", "/admin/profile"),
                {
                  key: "logout",
                  label: <div onClick={() => logout()}>Logout</div>,
                },
              ]}
            />
          }
          placement="bottomLeft"
        >
          <Button size="small" type="text">
            <UserOutlined /> {email}
          </Button>
        </Dropdown>
      </Header>
      <Layout
        className="content__container"
        style={{ marginLeft: state.spaceContent }}
      >
        <Content className="content__wrapper">
          <div className="content__subWrapper">{children}</div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Award App ©2022 Created by ME
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
