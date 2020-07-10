// 使用 Mock
import Mock from 'mockjs'


export default Mock.mock('/HR/role', 'post', {
    code: 0,
    msg: "操作成功",
    data: {
        role:[
            {
                role_id: "1",
                role_name: "员工"
            },
            {
                role_id: "2",
                role_name: "人事管理"
            },
            {
                role_id: "3",
                role_name: "员工"
            },
            {
                role_id: "4",
                role_name: "人事管理"
            },
            {
                role_id: "5",
                role_name: "员工"
            },
            {
                role_id: "6",
                role_name: "人事管理"
            },
            {
                role_id: "7",
                role_name: "员工"
            },
            {
                role_id: "8",
                role_name: "人事管理"
            },
            {
                role_id: "9",
                role_name: "员工"
            },
            {
                role_id: "10",
                role_name: "人事管理"
            },
            {
                role_id: "11",
                role_name: "员工"
            },
            {
                role_id: "12",
                role_name: "人事管理"
            }
        ],
        size: 20,
        p: 1,
        totalElement: 123,
        totalPage: 7
    }
})
