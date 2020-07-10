import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login as actionLogin } from '../../store/action';
import './Login.scss';
const Login = (props) => {
    useEffect(() => {
        if (props.islogin) {
            props.history.push('/manage');
        }
    });
    const onFinish = async (values) => {
        try {
            const { username, password } = values;
            const userinfo = await axios({
                method: 'post',
                url: '/login',
                headers: { 'Content-Type': 'multipart/form-data' },
                data: {
                    username: username,
                    passwd: password,
                },
            });
            if (userinfo.data.code === 0) {
                props.login(userinfo.data.data.loginUser, {
                    username,
                    password,
                });
                props.history.push('/manage');
            } else {
                console.log('请求失败');
            }
        } catch (err) {
            console.log('登陆失败', err);
        }
    };

    return (
        <div className="login">
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Username"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                    >
                        Log in
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                </Form.Item>
            </Form>
        </div>
    );
};

const mapStateToProps = (state) => ({
    islogin: state.login,
});

const mapDispatchToProps = (dispatch) => ({
    login: (resinfo, userinfo) => dispatch(actionLogin(resinfo, userinfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
