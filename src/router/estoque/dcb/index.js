import { RouterView } from "vue-router";
const Dcb = () =>
    import ("@/views/estoque/dcb/Dcb.vue");
const NovoDcb = () =>
    import ("@/views/estoque/dcb/NovoDcb.vue");

const DcbViews = {
    path: "dcb",
    name: "Dcb",
    component: RouterView,
    children: [{
            path: ":page",
            name: "Dcb",
            component: Dcb,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:dcbId",
            name: "Editar Cadastro de Dcb",
            component: NovoDcb,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "Novo Cadastro de Dcb",
            component: NovoDcb,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default DcbViews;