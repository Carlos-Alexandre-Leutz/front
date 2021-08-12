import { RouterView } from "vue-router";
const Cidade = () =>
    import ("@/views/regiao/cidade/Cidade.vue");
const NovoCidade = () =>
    import ("@/views/regiao/cidade/NovoCidade.vue");

const CidadeViews = {
    path: "cidade",
    name: "Cidade",
    component: RouterView,
    children: [{
            path: ":page",
            name: "Cidade",
            component: Cidade,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:cidadeId",
            name: "Editar Cidade",
            component: NovoCidade,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "Novo Cidade",
            component: NovoCidade,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default CidadeViews;