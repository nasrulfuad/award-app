import { Card, Col, Row, Typography } from "antd";
import { TAuthLayout } from "types/component/layout.component";

const AuthLayout: React.FC<TAuthLayout> = (props) => {
  const { children, title } = props;

  return (
    <Row style={styles.container} align="middle">
      <Col {...grids.space}></Col>
      <Col {...grids.card}>
        <Card title={<Typography.Title level={2}>{title}</Typography.Title>}>
          {children}
        </Card>
      </Col>
      <Col {...grids.space}></Col>
    </Row>
  );
};

const styles = {
  container: {
    height: "100vh",
  },
};

const grids = {
  space: {
    xs: 3,
    sm: 4,
    md: 6,
    lg: 7,
    xl: 9,
  },
  card: {
    xs: 18,
    sm: 16,
    md: 12,
    lg: 10,
    xl: 6,
  },
};

export default AuthLayout;
