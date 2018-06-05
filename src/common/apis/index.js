import axios from 'axios'
import { hashHistory } from 'react-router'

import LoginPost from './Login'
import ActListPost from './getActList'
import isLogin from './isLogin'
import ActInfoPost from './SelectActInfo'
import myAarticlePost from './myAarticle'
import saveArtPost from './saveArt'
import articleInfoPost from './articleInfo'
import SubmitArticalePost from './SubmitArticale'
import ArticleListPost from './getArticleList'
import loginOutPost from './LogOut'
import VotePost from './vote'
import VoteNumPost from './voteNum'


const host = 'http://wechat.crnonline.org/index.php/Api/Poster/'
const posterHost = 'http://poster.crnonline.org/index.php/Api/Poster/'

// 实例化 ajax请求对象
const ajaxinstance = axios.create({
  baseURL: host,
  timeout: 5000,
  // withCredentials: true,
  headers: {
    // responseType: 'JSON',
    // 'Content-Type': 'application/json'
  }
})

const Postajaxinstance = axios.create({
  baseURL: posterHost,
  timeout: 5000,
  // withCredentials: true,
  headers: {
    // responseType: 'JSON',
    // 'Content-Type': 'application/json'
  }
})

// 添加拦截器，处理 公用请求参数，和通用请求头部
ajaxinstance
  .interceptors
  .request
  .use((config) => {
    // TODO
    console.log(config);
    
    return config
  }, (error) => {
    Promise.reject(error)
  })

// 请求响应拦截器
ajaxinstance
  .interceptors
  .response
  .use((response) => {
    // TODO
    return response.data
  }, (error) => {
    let isLogin = true

    // TODO 登录鉴权
    if (!isLogin) {
      hashHistory.push('/login')
    }
    return Promise.reject(error)
  })

Postajaxinstance
  .interceptors
  .request
  .use((config) => {
    // TODO
    console.log(config);
    
    return config
  }, (error) => {
    Promise.reject(error)
  })

// 请求响应拦截器
Postajaxinstance
  .interceptors
  .response
  .use((response) => {
    // TODO
    return response.data
  }, (error) => {
    let isLogin = true

    // TODO 登录鉴权
    if (!isLogin) {
      hashHistory.push('/login')
    }
    return Promise.reject(error)
  })

/**
 * [API api接口封装]
 * @type {Object}
 */
const API = {
  ...LoginPost(ajaxinstance),
  ...loginOutPost(ajaxinstance),
  ...ActListPost(ajaxinstance),
  ...isLogin(ajaxinstance),
  ...ActInfoPost(ajaxinstance),
  ...myAarticlePost(ajaxinstance),
  ...saveArtPost(ajaxinstance),
  ...articleInfoPost(ajaxinstance),
  ...SubmitArticalePost(ajaxinstance),
  ...ArticleListPost(ajaxinstance),
  ...VotePost(ajaxinstance),
  ...VoteNumPost(ajaxinstance)
}

export default API
