import { reactive } from "vue";

const state = reactive({                            // Estado
  user: null,
});

const methods = {                                   // Método para modificar el estado
  setUser(payload) {                                // Recibe un payload (session de supabase)
    state.user = payload ? payload.user : null;     // Si el payload=true (existe) solo usaremos el payload.user, sino existe será null
    console.log(state.user)                         // y el rdo de este ternario = state.user
},
};

export default {
  state,
  methods,
};
