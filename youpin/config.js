/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
const host = 'https://coupon.igufei.com';
//const host = 'http://localhost:3001';
const config = {
    clentId:"wxapp1983",
    // 下面的地址配合云端 Demo 工作
    service: {
        host,
        searchGoods: `/goods/search`,
        loginUrl: `${host}/wxapp/login`,
        userUrl: `${host}/wxapp/userinfo`,
        add_collection_like: `${host}/wxapp/add_collection_like`,
        remove_collection_like: `${host}/wxapp/remove_collection_like`,
        isFav: `${host}/wxapp/isfav`,
        favlist: `${host}/wxapp/favlist`,
        signin: `${host}/wxapp/signin`,
        integral_log: `${host}/wxapp/integral_log`,
        submit_order: `${host}/wxapp/submit_order`,
        order_list: `${host}/wxapp/order_list`,
        confirm_order: `${host}/wxapp/confirm_order`,
    },
    version:'1.4.5.26',
    wxAppName:'IGF优品'
};

module.exports = config;
