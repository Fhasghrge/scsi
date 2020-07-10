// 使用 Mock
import Mock from 'mockjs'


export default Mock.mock('/HR/userRole/update/10', 'post', {
    code: 0,
    msg: "操作成功"
})
