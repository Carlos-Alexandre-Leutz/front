import { RouterView } from "vue-router";
const Prescritor = () =>
    import ("@/views/pessoa/prescritor/Prescritor.vue");
const NovoPrescritor = () =>
    import ("@/views/pessoa/prescritor/NovoPrescritor.vue");

const PrescritorViews = {
    path: "prescritor",
    name: "Prescritor",
    component: RouterView,
    children: [{
            path: ":page",
            name: "Prescritor",
            component: Prescritor,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:prescritorId",
            name: "Editar Prescritor",
            component: NovoPrescritor,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "Novo Prescritor",
            component: NovoPrescritor,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "visualizar/:prescritorId/:visualizar",
            name: "Visualizar Prescritor",
            component: NovoPrescritor,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default PrescritorViews;