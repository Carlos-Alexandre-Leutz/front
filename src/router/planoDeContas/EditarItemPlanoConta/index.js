import { RouterView } from "vue-router";
const EditarRegistroPlanoContavue = () =>
    import ("@/views/parametro/planoDeContas/EditarRegistroPlanoConta.vue");


const EditarRegistroPlanoContaViews = {
    path: "EditarRegistroPlanoConta",
    name: "EditarRegistroPlanoConta",
    component: RouterView,
    children: [{
            path: "/planocontas/editar",
            name: "EditarRegistroPlanoConta",
            component: EditarRegistroPlanoContavue
        },

    ]
};


export default EditarRegistroPlanoContaViews;