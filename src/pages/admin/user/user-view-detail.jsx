import React from 'react';
import { Badge, Descriptions } from 'antd';
import { Drawer } from 'antd';


const UserViewDetail = ({openViewDetail, setOpenViewDetail, dataViewDetail, setDataViewDetail}) => {

  const onClose = () => {
    setOpenViewDetail(false);
  };

    return (
        <Drawer
            title="User Detail"
            width={"50vw"}
            onClose={onClose}
            open={openViewDetail}
        >
          <Descriptions bordered>
          <Descriptions.Item label="Tên">{dataViewDetail.name}</Descriptions.Item>
          <Descriptions.Item label="Email" span={2}>{dataViewDetail.email}</Descriptions.Item>
          <Descriptions.Item label="Phone">{dataViewDetail.phone}</Descriptions.Item>
          <Descriptions.Item label="Address" span={2}>
            {dataViewDetail.address}
          </Descriptions.Item>
          <Descriptions.Item label="Status" span={3}>
            <Badge status="processing" text={dataViewDetail.status} />
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    )
}


export default UserViewDetail;