import { RouterView } from "vue-router";
const Visitador = () =>
    import ("@/views/pessoa/visitador/Visitador.vue");
const NovoVisitador = () =>
    import ("@/views/pessoa/visitador/NovoVisitador.vue");

const VisitadorViews = {
    path: "visitador",
    name: "Visitador",
    component: RouterView,
    children: [{
            path: ":page",
            name: "visitador",
            component: Visitador,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:visitadorId",
            name: "Editars visitador",
            component: NovoVisitador,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "novo",
            name: "Novo visitador",
            component: NovoVisitador,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "visualizar/:visitadorId/:visualizar",
            name: "Visualizar visitador",
            component: NovoVisitador,
            meta: {
                requiresAuth: true
            }
        },
    ]
};

export default VisitadorViews;