import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import usersTable from './usersTable.js';

const store = new Vuex.Store({
	modules: {
		usersTable
	},
	strict: process.env.NODE_ENV !== 'production'
});

export default store;