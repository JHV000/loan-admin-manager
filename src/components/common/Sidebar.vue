<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="item in items">
                <template>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-star-on',
                        index: 'home',
                        title: '数据总览'
                    },
                    {
                        icon: 'el-icon-search',
                        index: 'customerlist',
                        title: '客户列表'
                    },
                    {
                        icon: 'el-icon-menu',
                        index: 'Redistribution',
                        title: '客户公共池'
                    },
                    {
                        icon: 'el-icon-message',
                        index: 'educheck',
                        title: '额度预估'
                    },
                    {
                        icon: 'el-icon-document',
                        index: 'employeelist',
                        title: '员工列表'
                    },
                    {
                        icon: 'el-icon-time',
                        index: 'employeeCheck',
                        title: '员工审核'
                    },
                    
                    
                    // {
                    //     icon: 'el-icon-menu',
                    //     index: '2',
                    //     title: '表格',
                    //     subs: [
                    //         {
                    //             index: 'basetable',
                    //             title: '基础表格'
                    //         },
                    //         {
                    //             index: 'vuetable',
                    //             title: 'Vue表格组件'
                    //         }
                    //     ]
                    // },
                    // {
                    //     icon: 'el-icon-date',
                    //     index: '3',
                    //     title: '表单',
                    //     subs: [
                    //         {
                    //             index: 'baseform',
                    //             title: '基本表单'
                    //         },
                    //         {
                    //             index: 'vueeditor',
                    //             title: '编辑器'
                    //         },
                    //         {
                    //             index: 'markdown',
                    //             title: 'markdown'
                    //         },
                    //         {
                    //             index: 'upload',
                    //             title: '文件上传'
                    //         }
                    //     ]
                    // }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 200px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
