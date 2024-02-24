import React, { useState } from 'react';
import { Button, Form, Input, Modal, message, notification } from 'antd';
import { createUser } from '../../../services/api';


const CreateUser  = () => {
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const [form]= Form.useForm();

  const showModal = () => {
    setOpenModalCreate(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
    setOpenModalCreate(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpenModalCreate(false);
  };
  const onFinish = async (values) => {
    const {userId, name, password, address, phone, email} = values;
    setIsSubmit(true);
    const res= await createUser(userId, name, password, address, phone, email);
    if(res && res.data) {
        message.success("tạo mới thành công");
        form.resetFields();
        setOpenModalCreate(false);
    } else
    notification.error({
        message: "Đã có lỗi",
        description: res.message
    })
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create User
      </Button>
      <Modal
        title="Create New User"
        open={openModalCreate}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        isSubmit={isSubmit}
      >
         <Form form = {form}
            onFinish={onFinish}>
            <Form.Item
                label="Username"
                name="name"
                rules={[
                    {
                    required: true,
                    message: 'Vui lòng nhập tên !',
                    },
                ]}
                >
                <Input />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu !',
                    },
                ]}
                >
                <Input.Password />
            </Form.Item>
            <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[
                    {
                    required: true,
                    message: 'Vui lòng nhập địa chỉ !',
                    },
                ]}
                >
                <Input />
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                    required: true,
                    message: 'Vui lòng nhập email !',
                    },
                ]}
                >
                <Input />
            </Form.Item>
            <Form.Item
                label="Phone"
                name="phone"
                rules={[
                    {
                    required: true,
                    message: 'Vui lòng nhập số điện thoại !',
                    },
                ]}
                >
                <Input />
            </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default CreateUser;