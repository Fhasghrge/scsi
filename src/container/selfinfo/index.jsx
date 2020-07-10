import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Descriptions, Badge } from 'antd';
import { connect } from 'react-redux';

const Selfinfo = (props) => {
    const [userinfo, setUserinfo] = useState({});
    const [signInfo, setSignInfo] = useState({});
    useEffect(() => {
        async function getinfo() {
            const resUserinfo = await axios({
                method: 'post',
                headers: { 'Content-Type': 'multipart/form-data' },
                url: '/office/users/get/now',
            });
            const resSigninfo = await axios({
                method: 'post',
                headers: { 'Content-Type': 'multipart/form-data' },
                url: '/office/attendances/get/now-today',
            });
            if (resUserinfo.data.code === 0) {
                setUserinfo(resUserinfo.data.data.user);
            } else {
                console.log('无此人用户信息');
            }
            if (resSigninfo.data.code === 0) {
                setSignInfo(resSigninfo.data.data);
            } else {
                console.log('无此人签到信息');
            }
        }
        getinfo();
    }, []);
    const status = (code) => {
        code = Number(code);
        if (code === 1) return 'success';
        else if (code === 2) return 'error';
        else return 'warning';
    };
    const text = (code) => {
        code = Number(code);
        if (code === 1) return '正常';
        else if (code === 2) return '缺勤';
        else return '请假';
    };
    return (
        <Descriptions title="个人信息" bordered>
            <Descriptions.Item label="用户名">
                {userinfo.user_name}
            </Descriptions.Item>
            <Descriptions.Item label="职称">{userinfo.post}</Descriptions.Item>
            <Descriptions.Item label="工资">
                {userinfo.user_salary}
            </Descriptions.Item>
            <Descriptions.Item label="用户ID">
                {userinfo.user_id}
            </Descriptions.Item>
            <Descriptions.Item label="电话号码" span={2}>
                {userinfo.user_tel}
            </Descriptions.Item>
            <Descriptions.Item label="今日上午签到">
                <Badge
                    status={status(signInfo.morning)}
                    text={text(signInfo.morning)}
                />
            </Descriptions.Item>
            <Descriptions.Item label="今日下午签到">
                <Badge
                    status={status(signInfo.afternoon)}
                    text={text(signInfo.afternoon)}
                />
            </Descriptions.Item>
            <Descriptions.Item label="今日晚上签到">
                <Badge
                    status={status(signInfo.evening)}
                    text={text(signInfo.evening)}
                />
            </Descriptions.Item>
            <Descriptions.Item label="邮箱">
                {userinfo.user_email}
            </Descriptions.Item>
        </Descriptions>
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Selfinfo);
