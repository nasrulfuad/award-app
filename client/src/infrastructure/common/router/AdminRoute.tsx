import { Spin } from "antd";
import { TPrivateRouteProps } from "types/router/privateRoute";
import AdminLayout from "infrastructure/components/layout/Admin.layout";
import { useAuth } from "infrastructure/hooks/useAuth";
import { Suspense } from "react";
import { Outlet } from "react-router";
import { Navigate } from "react-router-dom";

export const AdminRoute: React.FC<TPrivateRouteProps> = ({ path }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <AdminLayout>
      <Suspense
        fallback={<Spin className="page__loader" delay={500} size="large" />}
      >
        <Outlet />
      </Suspense>
    </AdminLayout>
  ) : (
    <Navigate to="/" replace state={{ path }} />
  );
};

export default AdminRoute;
