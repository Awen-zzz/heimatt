import request from '@/utils/request'
/**
 *
 * @param {type} 必须传  -- 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
 * @param {source} 必须传  -- 源id，文章id或评论id
 * @param {offset}   -- 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
 * @param {limit}   -- 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
 * @returns
 */
export const getCommentList = ({
  type, source, offset,
  limit
}) => {
  return request({
    url: 'comments',
    params: {
      type,
      source,
      offset,
      limit
    }
  })
}

/**
 *
 * @param {*} target 点赞的评论id
 * @returns
 */
export const addlike = (target) => {
  return request({
    method: 'POST',
    url: 'comment/likings',
    data: { target }
  })
}

/**
 *
 * @param {*} target 要取消点赞的评论id或评论回复id
 * @returns
 */
export const dellike = (target) => {
  return request({
    method: 'DELETE',
    url: `comment/likings/${target}`
  })
}

/**
 *  target 评论的目标id
 *  content 评论内容
 * @param {*} data
 * @returns
 */
export const addComment = (data) => {
  return request({
    method: 'POST',
    url: 'comments',
    data
  })
}
