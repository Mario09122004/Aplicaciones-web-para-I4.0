import MenuDynamic from "../menu/MenuDynamic";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Outlet } from "react-router";

function Dashboard() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={220}>
        <MenuDynamic />
      </Sider>
      <Layout>
        <Header/>
        <Content style={{ margin: "24px 16px 0", padding: 24, background: "#fff" }}>
            <Outlet />
        </Content>
        <Footer/>
      </Layout>
    </Layout>
  );
}

export default Dashboard;