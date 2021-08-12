import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import { clickOutsideDirective } from "./directives/outsideClickHandler";
import i18nPlugin from "./plugins/i18n/i18nPlugin";
import router from "./router";
import "./assets/styles/scss/login/login.css";
import "./assets/styles/scss/fonts/fonts.css";
import "./assets/styles/scss/sidbar/sidebar.css";
import "./assets/styles/scss/checkbox/btnChackbox.css";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "devextreme/dist/css/dx.common.css";
("devextreme/dist/css/dx.common.css");
import "devextreme/dist/css/dx.light.css";
import "./assets/styles/scss/tooltip/tooltip.css"


/* 
Vue.config.productionTip = false 
//var axiosIntance = Axios.create({ baseURL: "https:/ / localhost: 5001 / " });
import Axios from "axios";
var axiosIntance = Axios.create({
    baseURL: store.getters.baseURL,
});
app.config.globalProperties.$http = axiosIntance;
axiosIntance.interceptors.response.use(
    console.log('interceptor '),
    );
*/
const app = createApp(App);
const token = JSON.parse(localStorage.getItem("user-token"));
app.directive("click-outside", clickOutsideDirective);
app
    .use(router)
    .use(store)
    .use(VueSweetalert2)
    .use(i18nPlugin, { locale: "br" })
    .mount("#app");

let url = document.location.hash.split("/")[1];
if (!token && url !== "esqueci-senha") {
    router.push({ name: "Login" });
} else if (!token) {
    router.push({ name: "EsqueciSenha" });
} else if (url == "Login" || "") {
    router.push({ path: "dashboar" });
}