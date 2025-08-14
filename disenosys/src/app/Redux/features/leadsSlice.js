import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    leads:[],
    leadXl:[],
    loading:false,
    error:null,
}

const leadsSlice = createSlice({
  name:"leads",
  initialState,
  reducers:{
    setLeads:(state,action) => {
     state.loading = action.payload.loading;
     state.leads = action.payload.data;
     state.error = action.payload.errors;
    },
     setLeadsXl:(state,action) => {
     state.loading = action.payload.loading;
     state.leadXl = action.payload.data;
     state.error = action.payload.errors;
    },
    updateLeads: (state, action) => {
  const updated = action.payload; // updated lead object

  if (Array.isArray(state.leads)) {
    const index = state.leads.findIndex(lead => lead._id === updated._id);
    if (index !== -1) {
      state.leads[index] = updated;
    } else {
      // Optionally push if not found
      state.leads.push(updated);
    }
  } 
}
  }
})

export const {setLeads,updateLeads,setLeadsXl} = leadsSlice.actions;
export default leadsSlice.reducer;