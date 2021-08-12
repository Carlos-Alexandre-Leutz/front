import { RouterView } from "vue-router";
const Estado = () =>
    import ("@/views/regiao/estado/Estado.vue");
const NovoEstado = () =>
    import ("@/views/regiao/estado/NovoEstado.vue");

const EstadoViews = {
    path: "estado",
    name: "Estado",
    component: RouterView,
    children: [{
            path: ":page",
            name: "Estado",
            component: Estado,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:estadoId",
            name: "Editar Estado",
            component: NovoEstado,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "Novo Estado",
            component: NovoEstado,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default EstadoViews;