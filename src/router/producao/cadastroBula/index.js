import { RouterView } from "vue-router";
const Bula = () =>
    import ("@/views/producao/cadastroBula/Bula.vue");
const NovaBula = () =>
    import ("@/views/producao/cadastroBula/NovoBula.vue");

const BulaViews = {
    path: "bula",
    name: "Bula",
    component: RouterView,
    children: [{
            path: ":page",
            name: "Bula",
            component: Bula,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:bulaId",
            name: "Editar Bula",
            component: NovaBula,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "Nova bula",
            component: NovaBula,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default BulaViews;