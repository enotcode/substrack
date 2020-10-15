import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls';

let ls = new SecureLS({isCompression: false});

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        subs: [],
        allSubPrice: 0
    },
    mutations: {
        setSubs: (state, payload) => {
            state.subs = payload;
        },
        setAllSubPrice: (state, payload) => {
            state.allSubPrice += Number(payload);
        },
        addNewSub: (state, payload) => {
            state.subs.push(payload);
        }
    },
    actions: {
        addSub({commit}, {name, price}) {
            commit("setAllSubPrice", price);
            commit("addNewSub", {name: name, price: price});
        }
    },
    plugins: [createPersistedState({
        paths: ['subs', 'allSubPrice'],
        storage: {
            getItem: (key) => ls.get(key),
            setItem: (key, value) => ls.set(key, value),
            removeItem: (key) => ls.remove(key),
        }
    })]
});
