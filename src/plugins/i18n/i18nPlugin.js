import { inject, ref } from "vue";
import br from "./br";
import es from "./es";
//import i18nPlugin from "@/plugins/i18n/i18nPlugin";

export default {
    install: (app, options) => {
        provideI18n(app, {
            locale: options.locale,
            translations: {
                br,
                es
            }
        });
    }
};

const createI18n = config => ({
    locale: ref(config.locale),
    translations: config.translations,
    translate(key) {
        const value = this.translations[this.locale.value][key];
        return value ? value : key;
    }
});

const i18nSymbol = Symbol("");

export function provideI18n(app, i18nConfig) {
    console.log("Provide: ", i18nConfig);
    const i18n = createI18n(i18nConfig);
    console.log("Provide i18nSymbol: ", i18nSymbol);
    app.config.globalProperties.$i18n = i18n;
    app.provide(i18nSymbol, i18n);
    //app.use(i18nPlugin, { locale: "br" })

}

export function useI18n() {
    const i18n = inject(i18nSymbol);
    if (!i18n) throw new Error("No i18n provided!!!");
    return i18n;
}