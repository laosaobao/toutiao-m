import axios from 'axios'
import store from '@/store';
import JSONBig from 'json-bigint'
const request=axios.create({
    baseURL:'http://toutiao.itheima.net',
    //自定义后端返回的原始数据，axios默认用原始的JSON.parse转为对象，处理bigint类型会精度丢失
    transformResponse:[function(data){
      try {
        return JSONBig.parse(data)
      } catch (error) {
        return data
      }
    }]
})

//请求拦截器
request.interceptors.request.use(function (config) {
    // Do something before request is sent
    const{user}=store.state
    if(user && user.token)
    {
        config.headers.Authorization=`Bearer ${user.token}`
    }
    //return config ,请求才能继续
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });


//响应拦截器

export default request