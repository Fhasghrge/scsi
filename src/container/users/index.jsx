/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form, message } from 'antd';
import axios from 'axios';

const EditableContext = React.createContext();

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef();
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async (e) => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

export default class UserTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '用户ID',
                dataIndex: 'user_id',
            },
            {
                title: '用户名',
                dataIndex: 'user_name',
                width: '30%',
                editable: true,
            },
            {
                title: '密码',
                dataIndex: 'user_password',
                editable: true,
            },
            {
                title: '职级',
                dataIndex: 'post',
                editable: true,
            },
            {
                title: '邮箱',
                dataIndex: 'user_email',
                editable: true,
            },
            {
                title: '电话',
                dataIndex: 'user_tel',
                editable: true,
            },
            {
                title: '薪酬',
                dataIndex: 'user_salary',
                editable: true,
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <Popconfirm
                            title="确定删除？"
                            onConfirm={() => this.handleDelete(record.key)}
                        >
                            <a>删除</a>
                        </Popconfirm>
                    ) : null,
            },
        ];
        this.state = {
            dataSource: [],
            count: 2,
        };
    }

    handleDelete = async (key) => {
        try {
            const bodyFormData = new FormData();
            bodyFormData.set('dele_userid', key);
            const resdelete = await axios({
                method: 'post',
                url: `/HR//users/delete/${key}`,
                headers: { 'Content-Type': 'multipart/form-data' },
                data: bodyFormData,
            });
            if (resdelete.data.code === 0) {
                message.success('删除成功');
                const dataSource = [...this.state.dataSource];
                this.setState({
                    dataSource: dataSource.filter((item) => item.key !== key),
                });
            } else {
                message.warning('删除失败');
            }
        } catch (err) {
            message.error('删除失败');
        }
    };

    // handleAdd = () => {
    //     const { count, dataSource } = this.state;
    //     const newData = {
    //         user_id: '默认',
    //         user_name: '默认',
    //         user_passwd: '默认',
    //         user_position: '默认',
    //         user_email: '默认',
    //         user_tel: '默认',
    //         user_salary: '默认',
    //     };
    //     this.setState({
    //         dataSource: [newData, ...dataSource],
    //         count: count + 1,
    //     });
    // };
    handleAdd = async () => {
        try {
            const bodyFormData = new FormData();
            bodyFormData.set('user_id', 2020002);
            bodyFormData.set('user_name', '23422');
            bodyFormData.set('user_passwd', '123456');
            bodyFormData.set('user_post', '保洁');
            bodyFormData.set('user_email', '123456@163.com');
            bodyFormData.set('user_tel', '13212345678');
            bodyFormData.set('user_salary', 4000);
            bodyFormData.set('user_role', "普通员工");
            const addres = await axios({
                method: 'post',
                url: '/HR/users/add',
                headers: { 'Content-Type': 'multipart/form-data' },
                data: bodyFormData,
            });
            if (addres.data.code === 0) {
                message.success('新增成功！');
            } else {
                message.warning(addres.data.msg);
            }
        } catch (err) {
            console.log(err);
        }
    };

    handleSave = async (row) => {
        console.log(row);
        try {
            const bodyFormData = new FormData();
            bodyFormData.set('user_name', row.user_name);
            bodyFormData.set('user_passwd', row.user_password);
            bodyFormData.set('user_post', row.post);
            bodyFormData.set('user_email', row.user_email);
            bodyFormData.set('user_tel', row.user_tel);
            bodyFormData.set('user_salary', row.user_salary);
            const res = await axios({
                method: 'post',
                url: `/HR/users/update/${row.user_id}`,
                headers: { 'Content-Type': 'multipart/form-data' },
                data: bodyFormData,
            });
            if (res.data.code === 0) {
                message.success(res.data.msg);
                const newData = [...this.state.dataSource];
                const index = newData.findIndex((item) => row.key === item.key);
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                this.setState({
                    dataSource: newData,
                });
            } else {
                message.warning(res.data.msg);
            }
        } catch (err) {
            console.log(err);
        }
    };
    componentDidMount() {
        axios({
            method: 'get',
            headers: { 'Content-Type': 'multipart/form-data' },
            url: '/HR/users',
        }).then((res) => {
            if (res.data.code === 0) {
                const users = res.data.data.user;
                users.forEach((item) => {
                    item.key = item.user_id;
                });
                this.setState({
                    dataSource: users,
                    count: res.data.data.size,
                });
            } else {
                message.warning('无此权限！');
            }
        });
    }
    render() {
        const { dataSource } = this.state;
        const components = {
            body: {
                row: EditableRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: (record) => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div>
                <Button
                    onClick={this.handleAdd}
                    type="primary"
                    style={{
                        marginBottom: 16,
                    }}
                >
                    新增用户
                </Button>
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                />
            </div>
        );
    }
}
