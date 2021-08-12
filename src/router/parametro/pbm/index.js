import { RouterView } from "vue-router";
const PBM = () =>
    import ("@/views/parametro/PBM/PBM.vue");
const NovoPBM = () =>
    import ("@/views/parametro/PBM/NovoPBM.vue");

const PbmViews = {
    path: "pbm",
    name: "Pbm",
    component: RouterView,
    children: [{
            path: ":page",
            name: "Pbm",
            component: PBM,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:pbmId",
            name: "Editar Cadastro de Pbm",
            component: NovoPBM,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "Novo Cadastro de Pbm",
            component: NovoPBM,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default PbmViews;