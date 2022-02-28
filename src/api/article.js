// 文章请求模块

import request from '@/utils/request'

//获取文章列表
export const getArticles=params=>{
    return request({
        method:'GET',
        url:'/v1_0/articles',
        params:params
    })
}


export const getArticleByid=article_id=>{
    return request({
        method:'GET',
        url:`/v1_0/articles/${article_id}`
    })
}