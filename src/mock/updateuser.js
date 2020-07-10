// 使用 Mock
import Mock from 'mockjs'


export default Mock.mock('/HR/users/update', 'post', {
    code: 0,
    msg: "修改用户成功",
    data: {
        user_name: "小明",
        user_passwd: "123456",
        user_post: "组长",
        user_email: "123456@163.com",
        user_tel: "1388888888",
        user_salary: "3000"
    }
})
