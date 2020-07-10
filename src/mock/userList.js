// 使用 Mock
import Mock from 'mockjs'


export default Mock.mock('/HR/users', 'get', {
    code: 0,
    data: {
        user: [
            {
                user_id: "1",
                user_name: "小明",
                user_passwd: "123456",
                user_position: "3级",
                user_email: "123456@163.com",
                user_tel: "1388888888",
                user_salary: "3000"
            },
            {
                user_id: "2",
                user_name: "小红",
                user_passwd: "123456",
                user_position: "2级",
                user_email: "12345@163.com",
                user_tel: "1378888888",
                user_salary: "4000"
            },
            {
                user_id: "3",
                user_name: "小明",
                user_passwd: "123456",
                user_position: "3级",
                user_email: "123456@163.com",
                user_tel: "1388888888",
                user_salary: "3000"
            },
            {
                user_id: "4",
                user_name: "小明",
                user_passwd: "123456",
                user_position: "3级",
                user_email: "123456@163.com",
                user_tel: "1388888888",
                user_salary: "3000"
            },
            {
                user_id: "5",
                user_name: "小明",
                user_passwd: "123456",
                user_position: "3级",
                user_email: "123456@163.com",
                user_tel: "1388888888",
                user_salary: "3000"
            },
            {
                user_id: "6",
                user_name: "小明",
                user_passwd: "123456",
                user_position: "3级",
                user_email: "123456@163.com",
                user_tel: "1388888888",
                user_salary: "3000"
            },
            {
                user_id: "7",
                user_name: "小明",
                user_passwd: "123456",
                user_position: "3级",
                user_email: "123456@163.com",
                user_tel: "1388888888",
                user_salary: "3000"
            },
        ],
        size: 20,
        p: 1,
        totalElement: 123,
        totalPage: 7
    }
})
