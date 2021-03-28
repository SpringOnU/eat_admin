import axios from '@/libs/api.request'

export const getBanner = () => {
  return axios.request({
    url: 'getBanner',
    method: 'get'
  })
}

export const addBanner = info => {
  return axios.request({
    url: 'addBanner',
    data: info,
    method: 'post'
  })
}

export const editBanner = info => {
  return axios.request({
    url: 'editBanner',
    data: info,
    method: 'post'
  })
}

export const delBanner = info => {
  return axios.request({
    url: 'delBanner',
    data: info,
    method: 'post'
  })
}

// 公告
export const getNotice = () => {
  return axios.request({
    url: 'notice',
    method: 'get'
  })
}

export const addNotice = info => {
  return axios.request({
    url: 'notice/add',
    data: info,
    method: 'post'
  })
}

export const editNotice = info => {
  return axios.request({
    url: 'notice/edit',
    data: info,
    method: 'post'
  })
}

export const delNotice = info => {
  return axios.request({
    url: 'notice/del',
    data: info,
    method: 'post'
  })
}

// 每日广告
// 公告
export const getOneDay = () => {
  return axios.request({
    url: 'oneDay',
    method: 'get'
  })
}

export const addOneDay = info => {
  return axios.request({
    url: 'oneDay/add',
    data: info,
    method: 'post'
  })
}

export const editOneDay = info => {
  return axios.request({
    url: 'oneDay/edit',
    data: info,
    method: 'post'
  })
}

export const delOneDay = info => {
  return axios.request({
    url: 'oneDay/del',
    data: info,
    method: 'post'
  })
}

export const login = info => {
  return axios.request({
    url: 'login',
    data: info,
    method: 'post'
  })
}

export const getUser = () => {
  return axios.request({
    url: 'getUser',
    method: 'get'
  })
}

// 获取订单信息
export const getOrder = info => {
  return axios.request({
    url: 'getOrder',
    data: info,
    method: 'post'
  })
}

export const getStuff = info => {
  return axios.request({
    url: 'getStuff',
    data: info,
    method: 'post'
  })
}

// ===================================
export const getTableData = () => {
  return axios.request({
    url: 'get_table_data',
    method: 'get'
  })
}

export const getDragList = () => {
  return axios.request({
    url: 'get_drag_list',
    method: 'get'
  })
}

export const errorReq = () => {
  return axios.request({
    url: 'error_url',
    method: 'post'
  })
}

export const saveErrorLogger = info => {
  return axios.request({
    url: 'save_error_logger',
    data: info,
    method: 'post'
  })
}

export const uploadImg = formData => {
  return axios.request({
    url: 'image/upload',
    data: formData
  })
}

export const getOrgData = () => {
  return axios.request({
    url: 'get_org_data',
    method: 'get'
  })
}

export const getTreeSelectData = () => {
  return axios.request({
    url: 'get_tree_select_data',
    method: 'get'
  })
}
// 学校管理接口
// 公告
export const getSchool = () => {
  return axios.request({
    url: 'school',
    method: 'get'
  })
}

export const addSchool = info => {
  return axios.request({
    url: 'school/add',
    data: info,
    method: 'post'
  })
}

export const editSchool = info => {
  return axios.request({
    url: 'school/edit',
    data: info,
    method: 'post'
  })
}

export const delSchool = info => {
  return axios.request({
    url: 'school/del',
    data: info,
    method: 'post'
  })
}

// 退款列表
export const getOrderRefund = info => {
  return axios.request({
    url: 'getOrderRefund',
    data: info,
    method: 'post'
  })
}

// 提现列表
export const withdrawalList = info => {
  return axios.request({
    url: 'withdrawalList',
    data: info,
    method: 'post'
  })
}

// 意见反馈列表
export const feedbackList = info => {
  return axios.request({
    url: 'feedbackList',
    data: info,
    method: 'post'
  })
}

// 用户信息审核列表
export const myInformation = info => {
  return axios.request({
    url: 'myInformation',
    data: info,
    method: 'post'
  })
}
