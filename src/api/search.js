import request from '@/utils/request'

export const getSearchSuggest= querydata=>{
    return request({
        method: 'GET',
        url:'/v1_0/suggestion',
        params:{q:querydata}
    })
}
export const getSearchResult= params=>{
    return request({
        method: 'GET',
        url:'/v1_0/search',
        params
    })
}