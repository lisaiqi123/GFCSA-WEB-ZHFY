const http = uni.$u.http

// post请求，获取菜单
export const postMenu = (params, config = {}) => http.post('/menu/gostmenu', params, config)

// get请求，获取菜单，注意：get请求的配置等，都在第二个参数中，详见前面解释
export const getMenu = (data) => http.get('/menu/getmenu', data)