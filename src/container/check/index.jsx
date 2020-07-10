import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Switch, message } from 'antd';
import './index.scss';
import Axios from 'axios';

export const Check = () => {
    const [checked, setChecked] = useState(false);
    const [lodding, setLodding] = useState(false);
    const time = () => {
        const MorAftEve = new Date().getHours();
        if (MorAftEve >= 3 && MorAftEve < 11) return 1;
        else if (MorAftEve >= 11 && MorAftEve < 19) return 2;
        else return 3;
    };
    const onChange = async (check) => {
        if(!check) return
        try {
            console.log(time());
            setLodding(true);
            const bodyFormData = new FormData();
            bodyFormData.set('attendance_time', time());
            bodyFormData.set('attendance_status', 1);
            const res = await Axios({
                method: 'post',
                url: '/office/attendances/update/now',
                data: bodyFormData,
            }); 
            if(res.data.code === 0 ) {
                setLodding(false)
                setChecked(true)
            }else {
                message.warning(res.data.msg)
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="check">
            <Switch
                defaultChecked={checked}
                onChange={onChange}
                checkedChildren="已签到"
                unCheckedChildren="未签到"
                loading={lodding}
                disabled={checked}
            />
        </div>
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Check);
