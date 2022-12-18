import { createRouter, createWebHistory } from "vue-router";
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

    ],
});

export default router;
