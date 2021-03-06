import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Popconfirm, Form, message } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';

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

class RolesTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '用户ID',
                dataIndex: 'role_id',
                editable: true,
            },
            {
                title: '角色',
                dataIndex: 'role_name',
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
                            删除
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
            bodyFormData.set('delete_userRoleId', key);
            const resdelete = await axios({
                method: 'post',
                url: `/HR/userRole/delete/${key}`,
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
    handleSave = async (row) => {
        try {
            console.log(row);
            const bodyFormData = new FormData();
            bodyFormData.set('role_id', row.role_id);
            bodyFormData.set('user_id', this.props.user_id);
            const res = await axios({
                method: 'post',
                url: '/HR/userRole/update/10',
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
            url: '/HR/role',
        }).then((res) => {
            if (res.data.code === 0) {
                const roles = res.data.data.role;
                roles.forEach((item) => {
                    item.key = item.role_id;
                });
                this.setState({
                    dataSource: roles,
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
const mapStateToProps = (state) => ({
    user_id: state.info.user_id,
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(RolesTable);
