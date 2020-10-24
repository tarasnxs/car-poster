import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import SavedLots from '@/views/SavedLots'
import PreviousPosts from "@/views/PreviousPosts";
import Users from "@/views/Users";
import Settings from "@/views/Settings";

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/saved-lots',
            component: SavedLots
        },
        {
            path: '/previous-posts',
            component: PreviousPosts
        },
        {
            path: '/users',
            component: Users
        },
        {
            path: '/settings',
            component: Settings
        }
    ]
})