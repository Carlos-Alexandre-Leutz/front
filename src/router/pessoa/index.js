import { RouterView } from "vue-router";
const Pessoa = () =>
    import ("@/views/pessoa/fornecedor/Fornecedor.vue");
const NovoPessoa = () =>
    import ("@/views/pessoa/fornecedor/NovoFornecedor.vue");

const PessoaViews = {
    path: "pessoa",
    name: "Pessoa",
    component: RouterView,
    children: [{
            path: ":page",
            name: "Pessoa",
            component: Pessoa,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:pessoaId",
            name: "Editar Pessoa",
            component: NovoPessoa,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "visualizar/:pessoaId:/:visualizar",
            name: "Visualizar Pessoa",
            component: NovoPessoa,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "Nova Pessoa",
            component: NovoPessoa,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default PessoaViews;