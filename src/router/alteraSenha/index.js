import { RouterView } from "vue-router";
const AlteraSenhavue = () =>
    import ("@/views/login/alteraSenha.vue");


const AlteraSenhaViews = {
    path: "AlteraSenha",
    name: "AlteraSenha",
    component: RouterView,
    children: [{
            path: "/AlteraSenha",
            name: "AlteraSenha",
            component: AlteraSenhavue
        },

    ]
};


export default AlteraSenhaViews;