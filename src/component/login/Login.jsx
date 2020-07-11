import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import JSEncrypt from 'jsencrypt';

import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login as actionLogin } from '../../store/action';
import './Login.scss';
import Logo from '../../assets/images/logo.png';
import Image1 from '../../assets/images/1.PNG';
import Image2 from '../../assets/images/2.jpg';
import Image3 from '../../assets/images/3.jpg';

const Login = (props) => {
    useEffect(() => {
        if (props.islogin) {
            props.history.push('/manage');
        }
    });
    const onFinish = async (values) => {
        try {
            const { username, password } = values;
            let encryptor = new JSEncrypt();
            const publicKey = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCp+NRbK1GutOJvqL1pWtdiwo+u
                            8dPfpFBh2RejZrTOaYtpjt+ljr9QQoS3O/rM10t2jia+ARGgbVJ2X43W51dRMMBE
                            bc5JugnOba+i1GWOrb4SIxHOrDg47vkhRCoND9YMJe8IM+kwu5Husts+fAVZeJdi
                            P7KBqrAF4pdULl9gywIDAQAB`;
            encryptor.setPublicKey(publicKey);
            let rsaPassWord = encryptor.encrypt(password);
            const bodyFormData = new FormData();
            bodyFormData.set('username', username);
            bodyFormData.set('password', rsaPassWord);
            const userinfo = await axios({
                method: 'post',
                url: '/login',
                headers: { 'Content-Type': 'multipart/form-data' },
                data: bodyFormData,
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
        <div className="login index">
            <div id="topbar">
                <div className="list-container">
                    <ul className="link-list left">
                        <li className="firstli">
                            <a href="/">管理员</a>
                        </li>
                        <li className="secondli">
                            <a href="/">内部员工</a>
                        </li>
                        <li className="thirdli">
                            <a href="/">访客</a>
                        </li>
                    </ul>
                    <ul className="link-list right">
                        <li className="first">欢迎您的到来!</li>
                    </ul>
                </div>
            </div>
            <div className="slidershow middle">
                <div className="slides">
                    <input type="radio" name="r" id="r1" checked />
                    <input type="radio" name="r" id="r2" />
                    <input type="radio" name="r" id="r3" />

                    <div className="slide s1">
                        <a href="https://news.sina.cn/zt_d/yiqing0121">
                            <img src={Image1} alt="yiqiing" />
                        </a>
                    </div>

                    <div className="slide">
                        <a href="https://www.mem.gov.cn/xw/yjyw/202006/t20200627_352755.shtml">
                            <img src={Image2} alt="yiqiing" />
                        </a>
                    </div>
                    <div className="slide">
                        <a href="https://www.mem.gov.cn/xw/jyll/202007/t20200706_353102.shtml">
                            <img src={Image3} alt="yiqiing" />
                        </a>
                    </div>
                </div>

                <div className="navigaion">
                    <label htmlFor="r1" className="bar"></label>
                    <label htmlFor="r2" className="bar"></label>
                    <label htmlFor="r3" className="bar"></label>
                </div>
            </div>
            <footer>
                <div className="news-container">
                    <div className="news-list">
                        <div>
                            <h4 id="news-h">焦点新闻</h4>
                            <div className="more">
                                <a href="https://www.mem.gov.cn/">更多</a>
                            </div>
                        </div>
                        <div className="news-list-items">
                            <div className="news-list-item">
                                <h3 className="news-title">
                                    <i></i>
                                    <a href="https://www.mem.gov.cn/xw/bndt/202007/t20200706_353113.shtml">
                                        应急管理部发布2020年上半年全国自然灾害情况
                                    </a>
                                </h3>
                                <div className="news-content-des">
                                    近日，应急管理部会同自然资源部、水利部、农业农村部、气象局等部门对2020年上半年全国自然灾害情况进行了会商分析。
                                    经核定，上半年，全国自然灾害以洪涝、风雹、地质灾害为主，森林火灾、地震、干旱、低温冷冻和雪灾等也有不同程度发生。
                                </div>
                            </div>

                            <div className="news-list-item">
                                <h3 className="news-title">
                                    <a href="https://www.mem.gov.cn/xw/bndt/202007/t20200707_353179.html">
                                        应急管理部调度贵州省安顺市公交车坠入水库救援处置
                                    </a>
                                </h3>
                                <div className="news-content-des">
                                    7月7日12时许，贵州省安顺市西秀区虹山湖路一辆公交车坠入虹山水库。接报后，应急管理部党委书记、副部长黄明立即作出部署，要求全力以赴救援抢救伤员，
                                    迅速核实人数，查明事故原因，依法追究责任，举一反三排查隐患，压实责任，堵塞漏洞……
                                </div>
                            </div>
                        </div>

                        <footer className="copyright">
                            以上新闻均转载于网络
                        </footer>
                    </div>
                </div>
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
                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            noStyle
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                    </Form.Item>
                </Form>
            </footer>
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
