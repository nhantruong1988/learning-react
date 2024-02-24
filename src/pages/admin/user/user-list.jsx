import React from 'react';
import { Table, Row, Col } from 'antd';
import { callUserLists } from '../../../services/api';
import { useEffect, useState } from 'react';
import UserViewDetail from './user-view-detail';
import CreateUser from './create-user';


const UserList = () => {
    const [listUser, setListUser] = useState([]);
    const [openViewDetail, setOpenViewDetail] = useState(false);
    const [dataViewDetail, setDataViewDetail] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => {
      setIsModalOpen(false);
    };
    const columns = [
        {
            title: 'Id',
            dataIndex: 'key',
            render: (text, record, index) => {
                return (
                    <a href='#' onClick = {() => {
                        setDataViewDetail(record)
                        setOpenViewDetail(true)
                    }}>{record.key}</a>
                )
            }
        },
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: true
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: true,
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            sorter: true
        },
        {
            title: 'Address',
            dataIndex: 'address',
            sorter: true
        },
        {
            title: 'Status',
            dataIndex: 'status',
            sorter: true
        },
    ];

    useEffect(() => {
        const fetchUser = async () => {
            const res = await callUserLists();
            if(res && res.data) {
                const data = res.data.map (item => {
                    return {key: item.id, name: item.name, email: item.email, phone: item.phone, address: item.address, status: item.status}
                })
               setListUser(data)
            }
        }
        fetchUser();
    }, []);

    return (
        <>
            <CreateUser isOpen={isModalOpen} closeModal={closeModal} />
            <Row gutter={[20, 20]}>
                <Col span={24}>
                <Table
                    className='def'
                    columns={columns}
                    dataSource={listUser}
                />
                </Col>
            </Row>
            <UserViewDetail
            openViewDetail={openViewDetail}
            setOpenViewDetail={setOpenViewDetail}
            dataViewDetail={dataViewDetail}
            setDataViewDetail={setDataViewDetail}
            />

        </>
    )
}


export default UserList;