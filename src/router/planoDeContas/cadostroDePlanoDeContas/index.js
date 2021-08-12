import { RouterView } from "vue-router";
const CadastroPlanoDeContasvue = () =>
    import ("@/views/parametro/planoDeContas/CadastroDePlanoDeContas.vue");


const CadastroPlanoDeContasViews = {
    path: "CadastroPlanoDeContas",
    name: "CadastroPlanoDeContas",
    component: RouterView,
    children: [{
            path: "/planocontas/cadastro",
            name: "CadastroPlanoDeContas",
            component: CadastroPlanoDeContasvue
        },

    ]
};


export default CadastroPlanoDeContasViews;