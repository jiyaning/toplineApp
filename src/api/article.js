import request from '@/utils/request.js'

export function apiArticleList({ channel_id, timestamp }) {
    return request({
        url: '/app/v1_1/articles',
        method: 'get',
        params: {
            channel_id,
            timestamp,
            with_top: 1
        }
    })
}

export function apiArticleDislike(articleID) {
    return request({
        url: '/app/v1_0/article/dislikes',
        method: 'post',
        data: {
            target: articleID
        }
    })
}

export function apiArticleReport({ articleID, type, remark = '' }) {
    return request({
        url: '/app/v1_0/article/reports',
        method: 'post',
        data: {
            target: articleID,
            type,
            remark
        }
    })
}