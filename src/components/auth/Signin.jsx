import { useState } from "react";
import { callApi } from "../../common/callApi";
import { Button, Form, Input } from "antd";

const Signin = () => {
  let [user_data, setUserData] = useState({
    email: "",
    password: "",
  });
  const onFinish = (values: any) => {
    console.log("Success:", values);
    callApi.postApi("/user/login", user_data).then((res) => {
      localStorage.setItem("user", JSON.stringify(res.user));
      window.location.href = "/";
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <h1>Signin</h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
              type: "email",
            },
          ]}
          onChange={(e) => {
            setUserData((prevState) => {
              const user_data = { ...prevState };
              user_data.email = e.target.value;
              return user_data;
            });
          }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
          onChange={(e) => {
            setUserData((prevState) => {
              const user_data = { ...prevState };
              user_data.password = e.target.value;
              return user_data;
            });
          }}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signin;
