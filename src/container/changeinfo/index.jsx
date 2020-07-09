import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
const layout = {
    labelCol: {
        span: 2,
    },
    wrapperCol: {
        span: 16,
    },
};
const ChangeInfo = () => {
    const onFinish = async ({ username, passwd, tel, email }) => {
        try {
            const res = await axios({
                method: 'post',
                url: '/office/users/update/now',
                data: {
                    user_name: username,
                    user_password: passwd,
                    user_email: email,
                    user_tel: tel,
                },
            });
            if (res.data.code === 0) {
                message.success('修改成功！');
            } else {
                message.error(res.data.msg);
            }
        } catch (err) {
            message.error('修改失败！');
        }
    };

    return (
        <Form {...layout} name="changeinfo" onFinish={onFinish}>
            <Form.Item name={['user', 'username']} label="用户名">
                <Input />
            </Form.Item>
            <Form.Item name={['user', 'passwd']} label="密码">
                <Input />
            </Form.Item>
            <Form.Item
                name={['user', 'email']}
                label="邮箱"
                rules={[
                    {
                        type: 'email',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item name={['user', 'tel']} label="电话">
                <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                    修改
                </Button>
            </Form.Item>
        </Form>
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeInfo);
