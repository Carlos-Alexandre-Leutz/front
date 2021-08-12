import { RouterView } from "vue-router";
const Dashboardvue = () =>
    import ("@/views/dashboard/Dashboard.vue");


const DashboarViews = {
    path: "dashboar",
    name: "Dashboar",
    component: RouterView,
    children: [{
            path: "/dashboar",
            name: "Dashboar",
            component: Dashboardvue
        },

    ]
};


export default DashboarViews;