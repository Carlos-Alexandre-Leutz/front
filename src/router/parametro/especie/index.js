import { RouterView } from "vue-router";
const Especie = () =>
    import ("@/views/parametro/especie/Especie.vue");
const NovaEspecie = () =>
    import ("@/views/parametro/especie/NovoEspecie.vue");

const EspecieViews = {
    path: "especie",
    name: "Especie",
    component: RouterView,
    children: [{
            path: ":page",
            name: "Especie",
            component: Especie,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:especieId",
            name: "Editar Especie",
            component: NovaEspecie,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "Novo Cadastro de Especie",
            component: NovaEspecie,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default EspecieViews;