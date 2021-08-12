import { RouterView } from "vue-router";
const FormaPagamento = () =>
    import ("@/views/financeiro/formaPagamento/FormaPagamento.vue");
const NovoFormaPagamento = () =>
    import ("@/views/financeiro/formaPagamento/NovoFormaPagamento.vue");

const FormaPagamentoViews = {
    path: "formaPagamento",
    name: "Forma Pagamento",
    component: RouterView,
    children: [{
            path: ":page",
            name: "FormaPagamento",
            component: FormaPagamento,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:formaPagamentoId",
            name: "Editar Forma Pagamento",
            component: NovoFormaPagamento,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "Nova Forma Pagamento",
            component: NovoFormaPagamento,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:formaPagamentoId/:visualizar",
            name: "Visualizar Forma Pagamento",
            component: NovoFormaPagamento,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default FormaPagamentoViews;