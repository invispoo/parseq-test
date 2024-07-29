import { createVuetify } from 'vuetify';

import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import 'vuetify/lib/styles/main.sass';
import '@mdi/font/css/materialdesignicons.css';
import { mdi } from 'vuetify/iconsets/mdi';

// Translations provided by Vuetify
import { ru } from 'vuetify/locale';

const vuetify = createVuetify({
  locale: {
    locale: 'ru',
    fallback: 'ru',
    messages: { ru },
  },
  icons: {
    defaultSet: 'mdi',
    sets: {
      mdi,
    },
  },
  components,
  directives,
});

export default vuetify;
