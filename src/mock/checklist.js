// 使用 Mock
import Mock from 'mockjs'


export default Mock.mock('/attendances', 'get', {
    code: 0,
    data: {
        attendances: [
            {
                attendance_id: 1,
                user_id: 202010,
                user_name: "张三",
                attendance_date: "2020-7-8",
                attendance_time: 1,
                attendance_status: 2
            },
            {
                attendance_id: 2,
                user_id: 202010,
                user_name: "张三",
                attendance_date: "2020-7-8",
                attendance_time: 2,
                attendance_status: 3
            },
            {
                attendance_id: 3,
                user_id: 202010,
                user_name: "张三",
                attendance_date: "2020-7-8",
                attendance_time: 3,
                attendance_status: 2
            }
        ],
        size: 20,
        p: 1,
        totalElement: 123,
        totalPage: 7
    }
})
