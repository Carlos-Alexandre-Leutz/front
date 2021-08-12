import { RouterView } from "vue-router";
const PlanoDeContasvue = () =>
    import ("@/views/parametro/planoDeContas/PlanoDeContas.vue");


const PlanoDeContasViews = {
    path: "PlanoDeContas",
    name: "PlanoDeContas",
    component: RouterView,
    children: [{
            path: "/planocontas",
            name: "PlanoDeContas",
            component: PlanoDeContasvue
        },

    ]
};


export default PlanoDeContasViews;