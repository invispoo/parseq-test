import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './providers/vuetify';
import pinia from './providers/store';

export const app = createApp(App).use(vuetify).use(pinia);
