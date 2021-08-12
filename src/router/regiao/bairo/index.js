import { RouterView } from "vue-router";
const Bairro = () =>
    import ("@/views/regiao/bairo/Bairro.vue");
const NovoBairro = () =>
    import ("@/views/regiao/bairo/NovoBairro.vue");

const BairoViews = {
    path: "bairro",
    name: "Bairro",
    component: RouterView,
    children: [{
            path: ":page",
            name: "Bairro",
            component: Bairro,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:bairoId",
            name: "Editar Bairo",
            component: NovoBairro,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "novo",
            name: "Novo Bairo",
            component: NovoBairro,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default BairoViews;