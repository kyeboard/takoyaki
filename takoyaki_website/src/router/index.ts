import { createRouter, createWebHistory } from "vue-router";
import NewPluginView from "../views/NewPluginView.vue";
import InstallationView from "../views/InstallationView.vue";
import HomeView from "../views/HomeView.vue";
import MarketPlaceView from "@/views/MarketPlaceView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/market",
            name: "market",
            component: MarketPlaceView,
        },
        {
            path: "/installation",
            name: "installation",
            component: InstallationView,
        },
        {
            path: "/market/new",
            name: "new_plugin",
            component: NewPluginView,
        },
    ],
});

export default router;
