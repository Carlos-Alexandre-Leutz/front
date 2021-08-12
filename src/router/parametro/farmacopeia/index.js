import { RouterView } from "vue-router";
const Farmacopeia = () =>
    import ("@/views/parametro/farmacopeia/Farmacopeia.vue");
const NovaFarmacopeia = () =>
    import ("@/views/parametro/farmacopeia/NovoFarmacopeia.vue");

const FarmacopeiaViews = {
    path: "farmacopeia",
    name: "Farmacopeia",
    component: RouterView,
    children: [{
            path: ":page",
            name: "Farmacopeia",
            component: Farmacopeia,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:farmacopeiaId",
            name: "Editar Farmacopeia",
            component: NovaFarmacopeia,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "Novo Cadastro de Farmacopeia",
            component: NovaFarmacopeia,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default FarmacopeiaViews;