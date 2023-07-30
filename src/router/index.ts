import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    { path: "/articles", component: () => import("../view/Article.vue") },
    { path: "/tags", component: () => import("../view/TagPage.vue") },
    { path: "/", component: () => import("../view/Home.vue") },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
});

export default router;
