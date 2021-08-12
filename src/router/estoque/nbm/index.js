import { RouterView } from "vue-router";
const Nbm = () =>
    import ("@/views/estoque/nbm/Nbm.vue");
const NovoNbm = () =>
    import ("@/views/estoque/nbm/NovoNbm.vue");

const NbmViews = {
    path: "nbm",
    name: "Nbm",
    component: RouterView,
    children: [{
            path: ":page",
            name: "Nbm",
            component: Nbm,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:nbmId",
            name: "Editar Cadastro de Nbm",
            component: NovoNbm,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "Novo Cadastro de Nbm",
            component: NovoNbm,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default NbmViews;