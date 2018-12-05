<template>
    <div class="left-box">
        <div class="logo">
            <img src="static/images/logo.png"/>
        </div>
        <el-menu class="sidebar" :unique-opened="true" :default-active="currentPagePath" @open="handleOpen"
                 :router="true" theme="dark" @close="handleClose">
            <el-menu-item index="/dashboard">
                <i class="fa fa-tachometer"></i>
                <span>后台主页</span>
            </el-menu-item>
            <el-submenu index="goods">
                <template slot="title">
                    <i class="fa fa-product-hunt"></i>
                    <span>商品管理</span>
                </template>
                <el-menu-item index="/dashboard/goods">
                    <i class="fa fa-circle"></i>
                    <span>商品列表</span>
                </el-menu-item>
                <el-menu-item index="/dashboard/goodsgallery">
                    <i class="fa fa-circle"></i>
                    <span>商品标头图列表</span>
                </el-menu-item>
                <el-menu-item index="/dashboard/category">
                    <i class="fa fa-circle"></i>
                    <span>商品分类</span>
                </el-menu-item>
                <el-menu-item index="/dashboard/channel">
                    <i class="fa fa-circle"></i>
                    <span>首页分类</span>
                </el-menu-item>
                <el-menu-item index="/dashboard/brand">
                    <i class="fa fa-circle"></i>
                    <span>品牌管理</span>
                </el-menu-item>
                <el-menu-item index="/dashboard/goodsissue">
                    <i class="fa fa-circle"></i>
                    <span>商品疑问</span>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="order">
                <template slot="title">
                    <i class="fa fa-large fa-truck"></i>
                    <span>订单中心</span>
                </template>
                <el-menu-item index="/dashboard/order">
                    <i class="fa fa-circle"></i>
                    <span>订单列表</span>
                </el-menu-item>
                <!--<el-menu-item index="/dashboard/order/detail">-->
                    <!--<i class="fa fa-circle"></i>-->
                    <!--<span>发货单</span>-->
                <!--</el-menu-item>-->
                <!--<el-menu-item index="/dashboard/order/detail">-->
                    <!--<i class="fa fa-circle"></i>-->
                    <!--<span>退/换货</span>-->
                <!--</el-menu-item>-->
                <!--<el-menu-item index="/dashboard/order/detail">-->
                    <!--<i class="fa fa-circle"></i>-->
                    <!--<span>订单评价</span>-->
                <!--</el-menu-item>-->
            </el-submenu>
            <el-submenu index="operate">
                <template slot="title">
                    <i class="fa fa-large fa-truck"></i>
                    <span>店铺运营</span>
                </template>
                <el-menu-item index="/dashboard/operate/topic">
                    <i class="fa fa-circle"></i>
                    <span>专题管理</span>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="data">
                <template slot="title">
                    <i class="fa fa-large fa-line-chart"></i>
                    <span>数据统计</span>
                </template>
                <el-menu-item index="/dashboard/shopcart">
                    <i class="fa fa-circle"></i>
                    <span>购物车列表</span>
                </el-menu-item>
                <el-menu-item index="/dashboard/comment">
                    <i class="fa fa-circle"></i>
                    <span>评论列表</span>
                </el-menu-item>
                <el-menu-item index="/dashboard/coupon">
                    <i class="fa fa-circle"></i>
                    <span>优惠券列表</span>
                </el-menu-item>
                <el-menu-item index="/dashboard/keywords">
                    <i class="fa fa-circle"></i>
                    <span>热门搜索</span>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="user">
                <template slot="title">
                    <i class="fa fa-large fa-users"></i>
                    <span>会员管理</span>
                </template>
                <el-menu-item index="/dashboard/user">
                    <i class="fa fa-circle"></i>
                    <span>会员列表</span>
                </el-menu-item>
            </el-submenu>
            <!--<el-submenu index="setting">-->
                <!--<template slot="title">-->
                    <!--<i class="fa fa-large fa-wrench"></i>-->
                    <!--<span>店铺设置</span>-->
                <!--</template>-->
                <!--<el-menu-item index="/dashboard/setting">-->
                    <!--<i class="fa fa-circle"></i>-->
                    <!--<span>店铺信息</span>-->
                <!--</el-menu-item>-->
                <!--<el-menu-item index="/dashboard/setting/s">-->
                    <!--<i class="fa fa-circle"></i>-->
                    <!--<span>微信设置</span>-->
                <!--</el-menu-item>-->
                <!--<el-menu-item index="/dashboard/setting/a">-->
                    <!--<i class="fa fa-circle"></i>-->
                    <!--<span>首页设置</span>-->
                <!--</el-menu-item>-->
            <!--</el-submenu>-->
            <el-submenu index="shipper">
                <template slot="title">
                    <i class="fa fa-large fa-users"></i>
                    <span>快递公司</span>
                </template>
                <el-menu-item index="/dashboard/shipper">
                    <i class="fa fa-circle"></i>
                    <span>快递公司列表</span>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="ad">
                <template slot="title">
                    <i class="fa fa-large fa-picture-o"></i>
                    <span>广告管理</span>
                </template>
                <el-menu-item index="/dashboard/ad">
                    <i class="fa fa-circle"></i>
                    <span>广告列表</span>
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                currentPagePath: '/dashboard'
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            hasOwn() {
            }
        },
        mounted() {
            console.log(this.$route.path);
        }
    }

</script>
<style>
    .left-box {
        width: 200px;
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 5;
        height: 100%;
        float: left;
        flex-direction: column;
        background: #324157;
    }

    .left-box .sidebar {
        width: 200px;
        flex: 1;
        border-radius: 0;
        background: #324157;
    }

    .left-box .fa {
        margin-right: 10px;
        font-size: 18px;
    }

    .left-box .el-submenu .el-menu-item .fa {
        margin-right: 10px;
        font-size: 10px;
    }

    .left-box .logo {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 120px;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .5);
    }

    .left-box .logo img {
        height: 40px;
    }
</style>