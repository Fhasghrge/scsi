import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import JSEncrypt from 'jsencrypt'
const layout = {
    labelCol: {
        span: 2,
    },
    wrapperCol: {
        span: 16,
    },
};
const ChangeInfo = () => {
    const onFinish = async (row) => {
        const { username, passwd, tel, email } = row.user
        try {
            let encryptor = new JSEncrypt();
            const publicKey =`MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCp+NRbK1GutOJvqL1pWtdiwo+u
                            8dPfpFBh2RejZrTOaYtpjt+ljr9QQoS3O/rM10t2jia+ARGgbVJ2X43W51dRMMBE
                            bc5JugnOba+i1GWOrb4SIxHOrDg47vkhRCoND9YMJe8IM+kwu5Husts+fAVZeJdi
                            P7KBqrAF4pdULl9gywIDAQAB`
            encryptor.setPublicKey(publicKey);
            let rsaPassWord = encryptor.encrypt(passwd);
            const bodyFormData = new FormData();
            bodyFormData.set('user_name', username)
            bodyFormData.set('user_password', rsaPassWord)
            bodyFormData.set('user_email', email)
            bodyFormData.set('user_tel', tel)
            const res = await axios({
                method: 'post',
                url: '/office/users/update/now',
                headers: { 'Content-Type': 'multipart/form-data' },
                data: bodyFormData
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
