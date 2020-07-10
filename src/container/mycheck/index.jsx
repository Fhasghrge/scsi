import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import axios from 'axios';

const columns = [
    {
        title: '用户ID',
        dataIndex: 'user_id',
        width: 150,
    },
    {
        title: '用户名',
        dataIndex: 'user_name',
        width: 150,
    },
    {
        title: '签到时间',
        dataIndex: 'attendance_date',
    },
    {
        title: '签到次数',
        dataIndex: 'attendance_time',
    },
    {
        title: '签到状态',
        dataIndex: 'attendance_status',
    },
];

const Mycheck = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        async function getChecklist() {
            try {
                const resLists = await axios({
                    method: 'post',
                    headers: { 'Content-Type': 'multipart/form-data' },
                    url: '/office/attendances/get/now',
                });
                console.log(resLists);
                if (resLists.data.code === 0) {
                    const attendances = resLists.data.data.attendances;
                    attendances.forEach((item) => {
                        item.key = item.attendance_date;
                    });
                    setData(attendances);
                }
            } catch (err) {
                console.log(err);
            }
        }
        getChecklist();
    }, []);
    return <Table columns={columns} dataSource={data} />;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Mycheck);
