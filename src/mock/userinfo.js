// 使用 Mock
import Mock from 'mockjs'


export default Mock.mock('/office/users/get/now', 'post', {
  code: 0,
  data: {
    user: {
      user_id: 202010,
      post: "保洁员",
      user_name: "张三",
      user_email: "121213234@qq.com",
      user_tel: "15584445315",
      user_salary: 3000,
    }
  }
})
