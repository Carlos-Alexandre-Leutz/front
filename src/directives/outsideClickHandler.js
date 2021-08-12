//Link tutorial
//https://tahazsh.com/detect-outside-click-in-vue

export const clickOutsideDirective = {
    mounted(el, binding) {
        console.log("$el:", el, "Binding: ", binding);
        if (el) {
            console.log("$el:", el, "Binding: ", binding);
            // console.log("document: ", document);
            let handler = e => {
                //console.log("e", e);
                if (!el.contains(e.target) &&
                    el !== e.target &&
                    el.parentNode &&
                    !el.parentNode.contains(e.target)
                ) {
                    binding.value(e);
                }
            };
            //caso usar a diretiva em outro dropdown é necessário tratar
            el.__vueClickOutside__ = handler;
            document.addEventListener("click", handler);
        }
    },
    unmounted(el) {
        console.log("unbind el: clickOutsideDirective");
        // this.el.removeEventListener("click", this.stopProp);
        // document.body.removeEventListener("click", this.event);

        document.removeEventListener("onClick", el.__vueClickOutside__);
        el.__vueClickOutside__ = null;
    }
    // stopProp(event) {
    //   console.log("stopProp: ", event);
    //   event.stopPropagation();
    // },
};

// Vue.directive("click-outside", clickOutsideDirective);

console.log("Directives Initialized! ");