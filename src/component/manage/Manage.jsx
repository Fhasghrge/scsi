import React, { useState, useEffect, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { Menu } from 'antd';
import {
    UsergroupAddOutlined,
    UserOutlined,
    MoneyCollectOutlined,
} from '@ant-design/icons';
import './Manage.scss';
import Check from '../../container/check/index'
import Loading from '../../container/Loading/index'

const Main = lazy(() => import(/* webpackChunkName: "about"*/ '../Main.jsx'));

const { SubMenu } = Menu;

const Manage = (props) => {
    const [openKeys, SetOpenKeys] = useState(['sub1']);
    const [key, setKey] = useState(1);
    const rootSubmenuKeys = ['sub1', 'sub2', 'sub3'];
    const { islogin } = props;
    const onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(
            (key) => openKeys.indexOf(key) === -1
        );
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            SetOpenKeys(openKeys);
        } else {
            SetOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };
    const select = (item) => {
        setKey(Number(item.key));
    };
    useEffect(() => {
        if (!islogin) {
            props.history.push('/');
        }
    });

    return (
        <div className="manage">
            <Menu
                className="nav"
                mode="inline"
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                style={{ width: 256 }}
                onSelect={select}
            >
                <SubMenu
                    key="sub1"
                    title={
                        <span>
                            <UserOutlined />
                            <span>个人中心</span>
                        </span>
                    }
                >
                    <Menu.Item key="1">我的信息</Menu.Item>
                    <Menu.Item key="2">修改信息</Menu.Item>
                    <Menu.Item key="3">考情查询</Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub2"
                    icon={<UsergroupAddOutlined />}
                    title="人事管理"
                >
                    <Menu.Item key="4">用户信息</Menu.Item>
                    <Menu.Item key="5">职称信息</Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub3"
                    icon={<MoneyCollectOutlined />}
                    title="财务管理"
                >
                    <Menu.Item key="6">考勤信息</Menu.Item>
                </SubMenu>
            </Menu>
            <main>
                {/* waiting for beautify the transform */}
                <Suspense fallback={<Loading/>}>
                    <Main which={key}></Main>
                </Suspense>
                <Check/>
            </main>
        </div>
    );
};

const mapStateToProps = (state) => ({
    islogin: state.login,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Manage);
