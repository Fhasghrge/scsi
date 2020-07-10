// 使用 Mock
import Mock from 'mockjs'


export default Mock.mock('/HR//users/delete', 'post', {
    code: 0,
    msg: '操作成功'
})
