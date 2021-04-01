import * as usersApi from '@/api/users';

export default {
	namespaced: true,
	state: {
		users: [],
		sortIntegerReverse: false,
		sortStringReverse: false,
	},
	getters: {
		users: (state) => state.users,
		integerReverse: (state) => state.sortIntegerReverse,
		stringReverse: (state) => state.sortStringReverse,
	},
	mutations: {
		setUsers(state, data) {
			state.users = data;
		},
		sortedInt(state, key) {
			state.users.sort((a, b) => {
				return (a[`${key}`] - b[`${key}`]) * (state.sortIntegerReverse ? -1 : 1);
			});
			state.sortIntegerReverse = !state.sortIntegerReverse;
		},
		sortedStr(state, key) {
			state.users.sort((a, b) => {
				return (a[`${key}`].localeCompare(b[`${key}`])) * (state.sortStringReverse ? -1 : 1);
			});
			state.sortStringReverse = !state.sortStringReverse;
		},
		setData(state, data){
			console.log(1)
			//TODO: здесь проблема
			state.users.unshift(data);
		}
	},
	actions: {
		async getUsers({ commit }) {
			let data = await usersApi.loadUsers();
			commit('setUsers', data);
		},
		sorted({ commit }, { key, type }) {

			if (type.toString() === 'integer') {
				commit('sortedInt', key);
			} else {
				commit('sortedStr', key);
			}
		},
		addUser({ commit }, data){
			commit('setData', data);
		}
	}
}