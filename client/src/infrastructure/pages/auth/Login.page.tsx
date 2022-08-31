import { MailOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input, message } from "antd";
import AuthLayout from "infrastructure/components/layout/Auth.layout";
import { useAuth } from "infrastructure/hooks/useAuth";
import { setUser } from "infrastructure/store/user.reducer";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router";
import { TFormLogin, TLoginState } from "types/page/auth.page";

const { Item } = Form;

const LoginPage = () => {
  const [state, setState] = useState<TLoginState>({
    isLoading: false,
    errorMessages: [],
  });
  const { login, isAuthenticated } = useAuth();
  const dispatch = useDispatch();

  if (isAuthenticated) return <Navigate to="/admin/home" />;

  const execute = async (values: TFormLogin) => {
    try {
      setState((prevState) => ({ ...prevState, isLoading: true }));

      const data = await login(values);

      setState((prevState) => ({ ...prevState, isLoading: false }));

      message.success("Login Successfully!", 1.5, () =>
        dispatch(setUser.login(data))
      );
    } catch (error: any) {
      let errors: string[] = [];

      if (error?.response?.status === 404) {
        const { message } = error.response.data;

        errors = [message as string];
      } else {
        errors = ["Internal Server Error"];
      }

      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        errorMessages: errors,
      }));
    }
  };

  const { isLoading, errorMessages } = state;

  return (
    <AuthLayout title="Login">
      <Form
        name="loginForm"
        initialValues={{
          email: null,
        }}
        onFinish={execute}
      >
        {errorMessages.length > 0 && (
          <Item>
            <Alert
              message="Oopsss"
              description={errorMessages.map((msg, index) => (
                <div key={index}>{msg}</div>
              ))}
              type="error"
              showIcon
              closable
              onClose={() => setState({ ...state, errorMessages: [] })}
            />
          </Item>
        )}
        <Item
          name="email"
          rules={[
            { required: true, message: "Please input your email" },
            {
              type: "email",
              message: "Please input a valid email!",
            },
          ]}
        >
          <Input
            data-testid="input-email"
            id="email"
            prefix={<MailOutlined />}
            placeholder="Email"
          />
        </Item>
        <Item>
          <Button
            data-testid="button-login"
            type="primary"
            htmlType="submit"
            block
            loading={isLoading}
          >
            Sign In
          </Button>
        </Item>
      </Form>
    </AuthLayout>
  );
};

export default LoginPage;
