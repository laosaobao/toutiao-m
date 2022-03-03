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

  /**
 * 收藏文章
 */
   export const addCollect = target => {
    return request({
      method: 'POST',
      url: '/v1_0/article/collections',
      data: {
        target
      }
    })
  }

  /**
   * 取消收藏文章
   */
  export const deleteCollect = target => {
    return request({
      method: 'DELETE',
      url: `/v1_0/article/collections/${target}`
    })
  }

  /**
 * 点赞
 */
export const addLike = articleId => {
    return request({
      method: 'POST',
      url: '/v1_0/article/likings',
      data: {
        target: articleId
      }
    })
  }

  /**
   * 取消点赞
   */
  export const deleteLike = articleId => {
    return request({
      method: 'DELETE',
      url: `/v1_0/article/likings/${articleId}`
    })
  }