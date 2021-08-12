import { RouterView } from "vue-router";
const Ncm = () =>
    import ("@/views/parametro/ncm/Ncm.vue");
const NovoNcm = () =>
    import ("@/views/parametro/ncm/NovoNcm.vue");

const NcmViews = {
    path: "ncm",
    name: "Ncm",
    component: RouterView,
    children: [{
            path: ":page",
            name: "Ncm",
            component: Ncm,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:ncmId",
            name: "Editar Cadastro de Ncm",
            component: NovoNcm,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "Novo Cadastro de Ncm",
            component: NovoNcm,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default NcmViews;