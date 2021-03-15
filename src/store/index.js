import { createStore } from 'vuex'

import simulationModule from '@/store/modules/simulationModule';
import controlModule from '@/store/modules/controlModule';

export default createStore({
  modules: {
    simulationModule,
    controlModule,
  },
});
