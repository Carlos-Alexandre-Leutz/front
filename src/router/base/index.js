import { RouterView } from "vue-router";
const Dashboard = () =>
    import ("@/views/dashboard/Dashboard.vue");
const Login = () =>
    import ("@/views/login/Login.vue");

const BasePages = {
    path: "login",
    name: "Login",
    component: RouterView,
    children: [{
            path: "",
            name: "Login",
            component: Login,
        },
        {
            path: "dashboard",
            name: "Dashboard",
            component: Dashboard,
            meta: { requiresAuth: true }
        }
    ]
};

export default BasePages;