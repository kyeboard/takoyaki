// Import dependencies
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueFeather from "vue-feather";
import { Client, Account, Databases } from "appwrite"

// Import stylesheets
import "./assets/styles.sass";

// Create new Appwrite client
let appwrite = new Client();

appwrite
    .setProject("639eaa41605ece286d06")
    .setEndpoint("http://localhost/v1");

// Initiate appwrite services
let account = new Account(appwrite);
let database = new Databases(appwrite);

// Create a new VueJS app
createApp(App)
    .use(router)
    .provide("account", account)
    .provide("client", appwrite)
    .provide("databases", database)
    .component(VueFeather.name, VueFeather)
    .mount("#app");
