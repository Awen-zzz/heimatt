/* eslint-disable camelcase */
import request from '@/utils/request'
export const getMyChannels = () => {
  return request({
    url: 'user/channels'
  })
}
export const getArticleList = ({ channel_id, timestamp }) => {
  return request({
    url: 'articles',
    params: { channel_id, timestamp }
  })
}

/**
 *
 * @returns 获取所有接口列表数据
 */
export const getAllArticleList = () => {
  return request({
    url: 'channels'
  })
}
