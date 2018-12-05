import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    scrollBehavior: () => ({y: 0}),
    routes: [
        {
            path: '/',
            name: 'dashboard',
            redirect: '/dashboard'
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: require('@/components/DashboardPage'),
            children: [
                {
                    path: '/',
                    name: 'welcome',
                    component: require('@/components/WelcomePage')
                },
                {
                    path: 'goods',
                    name: 'goods',
                    component: require('@/components/Goods/GoodsPage')
                },
                {
                    path: 'goods/add',
                    name: 'goods_add',
                    component: require('@/components/Goods/GoodsAddPage')
                },
                {
                    path: 'goodsissue',
                    name: 'goodsissue',
                    component: require('@/components/GoodsIssue/GoodsIssuePage')
                },
                {
                    path: 'goodsissue/add',
                    name: 'goodsissue_add',
                    component: require('@/components/GoodsIssue/GoodsIssueAddPage')
                },
                {
                    path: 'category',
                    name: 'category',
                    component: require('@/components/Category/CategoryPage')
                },
                {
                    path: 'category/add',
                    name: 'category_add',
                    component: require('@/components/Category/CategoryAddPage')
                },
                {
                    path: 'brand',
                    name: 'brand',
                    component: require('@/components/Brand/BrandPage')
                },
                {
                    path: 'brand/add',
                    name: 'brand_add',
                    component: require('@/components/Brand/BrandAddPage')
                },
                {
                    path: 'order',
                    name: 'order',
                    component: require('@/components/Order/OrderPage')
                },
                {
                    path: 'order/detail',
                    name: 'order_detail',
                    component: require('@/components/Order/OrderDetailPage')
                },
                {
                    path: 'operate/topic',
                    name: 'topic',
                    component: require('@/components/Topic/TopicPage')
                },
                {
                    path: 'operate/topic/add',
                    name: 'topic_add',
                    component: require('@/components/Topic/TopicAddPage')
                },
                {
                    path: 'user',
                    name: 'user',
                    component: require('@/components/User/UserPage')
                },
                {
                    path: 'user/add',
                    name: 'user_add',
                    component: require('@/components/User/UserAddPage')
                },
                {
                    path: 'shipper',
                    name: 'shipper',
                    component: require('@/components/Shipper/ShipperPage')
                },
                {
                    path: 'shipper/add',
                    name: 'shipper_add',
                    component: require('@/components/Shipper/ShipperAddPage')
                },
                {
                    path: 'ad',
                    name: 'ad',
                    component: require('@/components/Ad/AdPage')
                },
                {
                    path: 'ad/add',
                    name: 'ad_add',
                    component: require('@/components/Ad/AdAddPage')
                },
                {
                    path: 'shopcart',
                    name: 'shopcart',
                    component: require('@/components/ShopCart/ShopCartPage')
                },
                {
                    path: 'comment',
                    name: 'comment',
                    component: require('@/components/Comment/CommentPage')
                },
                {
                    path: 'comment/add',
                    name: 'comment_add',
                    component: require('@/components/Comment/CommentAddPage')
                },
                {
                    path: 'coupon',
                    name: 'coupon',
                    component: require('@/components/Coupon/CouponPage')
                },
                {
                    path: 'coupon/add',
                    name: 'coupon_add',
                    component: require('@/components/Coupon/CouponAddPage')
                },
                {
                    path: 'keywords',
                    name: 'keywords',
                    component: require('@/components/Keywords/KeywordsPage')
                },
                {
                    path: 'keywords/add',
                    name: 'keywords_add',
                    component: require('@/components/Keywords/KeywordsAddPage')
                },
                {
                    path: 'channel',
                    name: 'channel',
                    component: require('@/components/Channel/ChannelPage')
                },
                {
                    path: 'channel/add',
                    name: 'channel_add',
                    component: require('@/components/Channel/ChannelAddPage')
                },
                {
                    path: 'goodsgallery',
                    name: 'goodsgallery',
                    component: require('@/components/GoodsGallery/GoodsGalleryPage')
                },
                {
                    path: 'goodsgallery/add',
                    name: 'goodsgallery_add',
                    component: require('@/components/GoodsGallery/GoodsGalleryAddPage')
                },
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: require('@/components/LoginPage')
        },
        {
            path: '*',
            redirect: '/dashboard'
        }
    ]
})
