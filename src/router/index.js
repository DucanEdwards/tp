import TouPiao from "../components/TouPiao.vue";
import Success from "../components/Success.vue";
import RepeatVote from "../components/RepeatVote.vue";
import { createRouter,createWebHashHistory} from "vue-router";

const routes = [
    { path: '/', component: TouPiao },
    { path: '/success',component: Success},
    { path: '/repeat-vote',component: RepeatVote}
]

const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

export default router