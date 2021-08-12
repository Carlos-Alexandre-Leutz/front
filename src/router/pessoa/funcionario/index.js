import { RouterView } from "vue-router";
const Funcionario = () =>
    import ("@/views/pessoa/funcionario/Funcionario.vue");
const NovoFuncionario = () =>
    import ("@/views/pessoa/funcionario/NovoFuncionario.vue");

const FuncionarioViews = {
    path: "funcionario",
    name: "Funcionario",
    component: RouterView,
    children: [{
            path: ":page",
            name: "Funcionario",
            component: Funcionario,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:funcionarioId",
            name: "Editar funcionario",
            component: NovoFuncionario,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "Novo funcionario",
            component: NovoFuncionario,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "visualizar/:funcionarioId:/:visualizar",
            name: "Visualizar funcionario",
            component: NovoFuncionario,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default FuncionarioViews;