import { RouterView } from "vue-router";
const Capsula = () =>
    import ("@/views/producao/especivicacaoCapsula/especificacaoCapsula.vue");
const NovaCapsula = () =>
    import ("@/views/producao/especivicacaoCapsula/novoEspecificacaoCapsula.vue");

const CapsulaViews = {
    path: "capsula",
    name: "Capsula",
    component: RouterView,
    children: [{
            path: ":page",
            name: "Capsula",
            component: Capsula,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:capsulaId",
            name: "Editar Capsula",
            component: NovaCapsula,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "Novo Cadastro de Capsula",
            component: NovaCapsula,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default CapsulaViews;