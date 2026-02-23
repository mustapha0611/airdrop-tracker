import { createApp } from "vue";
import { createPinia } from "pinia";
import primevue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import ToastService from "primevue/toastservice";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(primevue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: ".my-app-dark",
      cssVariables: {
        "p-toast-width": "15rem",
      },
    },
  },
});
app.use(ToastService);
app.mount("#app");