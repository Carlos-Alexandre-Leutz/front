import { RouterView } from "vue-router";
const Especialidade = () =>
    import ("@/views/venda/especialidade/Especialidade.vue");
const NovoEspecialidade = () =>
    import ("@/views/venda/especialidade/NovoEspecialidade.vue");

const EspecialidadeViews = {
    path: "especialidade",
    name: "Especialidade",
    component: RouterView,
    children: [{
            path: ":page",
            name: "Especialidade",
            component: Especialidade,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:especialidadeId",
            name: "Editar Cadastro de Cidade",
            component: NovoEspecialidade,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "Novo Cadastro de Cidade",
            component: NovoEspecialidade,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default EspecialidadeViews;