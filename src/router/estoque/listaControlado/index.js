import { RouterView } from "vue-router";
const ListaControlado = () =>
    import ("@/views/estoque/listaControlado/ListaControlado.vue");
const NovaListaControlado = () =>
    import ("@/views/estoque/listaControlado/NovaListaControlado.vue");

const ListaControladoViews = {
    path: "listaControlado",
    name: "ListaControlado",
    component: RouterView,
    children: [{
            path: ":page",
            name: "ListaControlado",
            component: ListaControlado,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:listaControladoId",
            name: "Editar Cadastro de Lista Controlado",
            component: NovaListaControlado,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "Novo Cadastro de Lista Controlado",
            component: NovaListaControlado,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default ListaControladoViews;