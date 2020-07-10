import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Switch } from 'antd';
import './index.scss';

export const Check = () => {
    const [checked, setChecked] = useState(false);
    const onChange = (checked) => {
        console.log(checked);
    };
    return (
        <div className="check">
            <Switch
                defaultChecked={false}
                onChange={onChange}
                checkedChildren="已签到"
                unCheckedChildren="未签到"
                loading={false}
                disabled={checked}
            />
        </div>
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Check);
