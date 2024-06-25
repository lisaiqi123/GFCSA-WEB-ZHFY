const http = uni.$u.http

// post请求，获取菜单
export const login = (params, config = {}) => http.post('/user/login', params, config)

