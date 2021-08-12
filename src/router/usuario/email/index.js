import { RouterView } from "vue-router";
const Configuracao = () =>
    import ("@/views/usuario/email/Configuracao.vue");
const NovaConfiguracao = () =>
    import ("@/views/usuario/email/NovaConfiguracao.vue");

const EmailViews = {
    path: "configuracaoEmail",
    name: "Email",
    component: RouterView,
    children: [{
            path: ":page",
            name: "Email",
            component: Configuracao,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:configId",
            name: "Editar Configuração de Email",
            component: NovaConfiguracao,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "nova",
            name: "Nova Configuração de Email",
            component: NovaConfiguracao,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "visualizar/:configId/:visualizar",
            name: "Visualizar Configuração de Email",
            component: NovaConfiguracao,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default EmailViews;