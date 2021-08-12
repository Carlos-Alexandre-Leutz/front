import { RouterView } from "vue-router";
const Siproquim = () =>
    import ("@/views/estoque/siproquim/Siproquim.vue");
const NovoSiproquim = () =>
    import ("@/views/estoque/siproquim/NovoSiproquim.vue");

const SiproquimViews = {
    path: "siproquim",
    name: "Siproquim",
    component: RouterView,
    children: [{
            path: ":page",
            name: "Siproquim",
            component: Siproquim,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:siproquimId",
            name: "Editar Siproquim",
            component: NovoSiproquim,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "Novo Siproquim",
            component: NovoSiproquim,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default SiproquimViews;