/* eslint-disable camelcase */
import request from '@/utils/request'
// eslint-disable-next-line camelcase
export const getArticle = (article_id) => {
  return request({
    url: `/articles/${article_id}`
  })
}
/**
 *g关注用户，target是article里的index文件里的article.aut_id
 * @param {*} target
 * @returns
 */
export const addUser = (target) => {
  return request({
    method: 'POST',
    url: 'user/followings',
    data: {
      target
    }
  })
}
/**
 *删除关注用户，取消关注
 * @param {*} target
 * @returns target是路径参数，用模板字符串写法
 */
export const delUser = (target) => {
  return request({
    method: 'DELETE',
    url: `user/followings/${target}`
  })
}
/**
 *
 * @param {*收藏的目标文章id} target
 * @returns
 */
export const addCollect = (target) => {
  return request({
    method: 'POST',
    url: 'article/collections',
    data: {
      target
    }
  })
}
/**
 * 接口中后缀带：的是路径参数，要模板字符串的写法
 * @param {*取消收藏的文章} target
 * @returns
 */
export const delCollect = (target) => {
  return request({
    method: 'DELECT',
    url: `article/collections/${target}`,
    data: {
      target
    }
  })
}
