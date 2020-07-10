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
                title: '考勤ID',
                dataIndex: 'user_attendance_id',
                editable: true,
            },
            {
                title: '用户ID',
                dataIndex: 'user_id',
                editable: true,
            },
            {
                title: '用户名',
                dataIndex: 'user_name',
                width: '30%',
                editable: true,
            },
            {
                title: '考勤时间',
                dataIndex: 'attendance_date',
                editable: true,
            },
            {
                title: '考勤次数',
                dataIndex: 'attendance_time',
                editable: true,
            },
            {
                title: '考勤状态',
                dataIndex: 'attendance_status',
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
            const resdelete = await axios({
                method: 'post',
                url: `/financial/attendances/delete/${key}`,
                headers: { 'Content-Type': 'multipart/form-data' },
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

    handleAdd = async () => {
        try {
            const bodyFormData = new FormData();
            bodyFormData.set('user_id', 2020012);
            bodyFormData.set('attendance_status', 2);
            bodyFormData.set('attendance_time', 1);
            bodyFormData.set('attendance_date', '2018-01-01');
            const addres = await axios({
                method: 'post',
                url: '/financial/attendances/add',
                headers: { 'Content-Type': 'multipart/form-data' },
                data: bodyFormData,
            });
            if (addres.data.code === 0) {
                message.success('新增成功！');
                // const { count, dataSource } = this.state;
                // const newData = {
                //     user_attendance_id: -1,
                //     user_id: -1,
                //     user_name: 'default',
                //     attendance_date: 'default',
                //     attendance_time: -1,
                //     attendance_status: -1,
                // };
                // this.setState({
                //     dataSource: [newData, ...dataSource],
                //     count: count + 1,
                // });
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
            const {
                user_attendance_id,
                user_id,
                attendance_time,
                attendance_status,
                attendance_date,
            } = row;
            const bodyFormData = new FormData();
            bodyFormData.set('user_id', user_id);
            bodyFormData.set('attendance_time', attendance_time);
            bodyFormData.set('attendance_status', attendance_status);
            bodyFormData.set('attendance_date', attendance_date);
            const res = await axios({
                method: 'post',
                url: `/financial/attendances/update/${user_attendance_id}`,
                headers: { 'Content-Type': 'multipart/form-data' },
                data: bodyFormData,
            });
            if (res.data.code === 0) {
                message.success('修改成功!');
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
            method: 'post',
            headers: { 'Content-Type': 'multipart/form-data' },
            url: '/financial/attendances/get',
        }).then((res) => {
            if (res.data.code === 0) {
                const lists = res.data.data.attendances;
                lists.forEach((item) => {
                    item.key = item.user_attendance_id;
                });
                this.setState({
                    dataSource: lists,
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
                    新增考勤
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
