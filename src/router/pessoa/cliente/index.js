import { RouterView } from "vue-router";
const Cliente = () =>
    import ("@/views/pessoa/cliente/Cliente.vue");
const NovoCliente = () =>
    import ("@/views/pessoa/cliente/NovoCliente.vue");

const ClienteViews = {
    path: "cliente",
    name: "Cliente",
    component: RouterView,
    children: [{
            path: ":page",
            name: "Cliente",
            component: Cliente,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:ClienteId",
            name: "Editar Cliente",
            component: NovoCliente,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "Novo Cliente",
            component: NovoCliente,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default ClienteViews;