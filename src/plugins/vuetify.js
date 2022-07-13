import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import 'vuetify/dist/vuetify.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

Vue.component('font-awesome-icon', FontAwesomeIcon);
library.add(fas);
Vue.use(Vuetify);

export default new Vuetify({
    breakpoint: {
        mobileBreakpoint: 'sm'
    },
    icons: {
        iconfont: 'faSvg'
    }
});
