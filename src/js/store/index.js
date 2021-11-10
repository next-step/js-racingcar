import Store from './store.js'
import actions from './actions.js'
import mutations from './mutations.js'

export const store = new Store({
	state: {
		cars: {},
		num: '',
		winners: [],
	},
	actions,
	mutations,
})
