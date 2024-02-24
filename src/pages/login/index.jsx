import React, { useState } from 'react';
import { Button, Divider, Form, Input, message, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { callLogin } from '../../services/api';


const LoginPage = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);

  const onFinish = async (values) => {
    const { email, password} = values;
    setIsSubmit(true);
    const res = await callLogin( email, password);
    setIsSubmit(false);
    if(res?.data) {
      message.success('Đăng nhập tài khoản thành công');
      const { token } = res.data;
      localStorage.setItem('token', token);
      navigate('/');
    } else {
      notification.error({
        message: 'Có lỗi xảy ra',
        description: res.data.msg && res.data.msg.length > 0 ? res.data.msg[0] : res.data.msg,
        duration: 5
      });
    }
  };

    return (
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="../../../src/assets/logo.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            ĐĂNG NHẬP
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Form
          name="basic"
          onFinish={onFinish}
          autoComplete="off"
      >
            <Form.Item
              labelCol={{ span: 24 }}
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Email không được để trống!' }]}
          >
              <Input />
          </Form.Item>
          <Form.Item
              labelCol={{ span: 24 }}
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}
          >
              <Input.Password />
          </Form.Item>


          <Form.Item
          >
              <Button type="primary" htmlType="submit" loading={isSubmit} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Đăng Nhập
              </Button>
          </Form.Item>
          <Divider>Or</Divider>
      </Form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Chưa có tài khoản?{' '}
            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
             Đăng ký ngay
            </a>
          </p>
        </div>
      </div>

    )
}
export default LoginPage;