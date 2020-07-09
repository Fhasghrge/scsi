// 使用 Mock
import Mock from 'mockjs'


export default Mock.mock('/office/attendances/get/now-today', 'post', {
    code: 0,
    data: {
        morning: 1,
        afternoon: 2,
        evening: 3
    }
})
