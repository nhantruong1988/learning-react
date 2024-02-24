import React, { useState } from 'react';
import { Button, Divider, Form, Input, message, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { callRegister } from '../../services/api';


const RegisterPage = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);

  const onFinish = async (values) => {
    const { email, password, name, phone, address} = values;
    console.log(values);
    setIsSubmit(true);
    const res = await callRegister( email, password, name, phone, address);
    setIsSubmit(false);
    if(res?.data?.userId) {
      message.success('Đăng ký tài khoản thành công');
      navigate('/login');
    } else {
      notification.error({
        message: 'Có lỗi xảy ra',
        description: res.data.msg && res.data.msg.length > 0 ? res.data.msg[0] : res.data.msg,
        duration: 5
      });
    }
  };

    return (
      <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="./../../src/assets/logo.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            ĐĂNG KÝ
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
              className="block text-sm font-medium leading-6 text-gray-900"
              rules={[{ required: true, message: 'Email không được để trống!' }]}
          >
              <Input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </Form.Item>
          <Form.Item
              labelCol={{ span: 24 }}
              label="Mật khẩu"
              name="password"
              className="block text-sm font-medium leading-6 text-gray-900"
              rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}
          >
              <Input.Password />
          </Form.Item>
          <Form.Item
              labelCol={{ span: 24 }}
              label="Họ tên"
              name="name"
              className="block text-sm font-medium leading-6 text-gray-900"
              rules={[{ required: true, message: 'Họ tên không được để trống!' }]}
          >
              <Input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </Form.Item>
          <Form.Item
              labelCol={{ span: 24 }}
              label="Số điện thoại"
              name="phone"
              className="block text-sm font-medium leading-6 text-gray-900"
              rules={[{ required: true, message: 'Số điện thoại không được để trống!' }]}
          >
              <Input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </Form.Item>
          <Form.Item
              labelCol={{ span: 24 }}
              label="Địa chỉ"
              name="address"
              className="block text-sm font-medium leading-6 text-gray-900"
              rules={[{ required: true, message: 'Địa chỉ không được để trống!' }]}
          >
              <Input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </Form.Item>

          <Form.Item
          >
              <Button type="primary" htmlType="submit" loading={isSubmit} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Đăng ký
              </Button>
          </Form.Item>
          <Divider>Or</Divider>
      </Form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Đã có tài khoản ?{' '}
            <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Đăng nhập
            </a>
          </p>
        </div>
      </div>

    </div>
    )
}
export default RegisterPage;