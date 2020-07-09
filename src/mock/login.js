// 使用 Mock
import Mock from 'mockjs'


export default Mock.mock('/login', 'post', {
    code: 0,
    data: {
        loginUser: {
            user_id: 202010,
            user_name: "张三",
            role_name: [
                "路人甲",
                "财务管理"
            ]
        }
    }
})
