import request from "../utils/request";

// import store from '@/store'


export const login= data =>{
    return request({
        method:'POST',
        url:'/v1_0/authorizations',
        data
    })
}

export const sendSms= mobile =>{
    return request({
        method:'GET',
        url:`/v1_0/sms/codes/${mobile}` //es6 ` `里用${}
    })
}
// 获取用户信息
export const getUserInfo= () =>{
    return request({
        method:'GET',
        url:'/v1_0/user'
        // headers:{
        //     Authorization:`Bearer ${store.state.user.token}`
        // }
    })
}

//获取用户频道列表

export const getUserChannels=()=>{
    return request({
        method:'GET',
        url:'/v1_0/user/channels'
    })
}

/**
 * 添加关注
 */
 export const addFollow = userId => {
    return request({
      method: 'POST',
      url: '/v1_0/user/followings',
      data: {
        target: userId
      }
    })
  }

  /**
   * 取消关注
   */
  export const deleteFollow = userId => {
    return request({
      method: 'DELETE',
      url: `/v1_0/user/followings/${userId}`
    })
  }

/**
   * 获取用户个人资料
   */
 export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/profile'
  })
}

/**
   * 更新用户个人资料
   */
 export const updateUserProfile = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}
/**
 * 更新用户头像
 */
export function updateUserPhoto (data) {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data
  })
}