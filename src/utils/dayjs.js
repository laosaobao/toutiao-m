import dayjs from "dayjs";
import Vue from 'vue'
//配置dayjs为中文
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'

//配置使用相对时间
dayjs.locale('zh-cn')
//配置处理相对时间的插件
dayjs.extend(relativeTime)
Vue.filter('relativeTime',value=>{
    return dayjs().to(dayjs(value))
})