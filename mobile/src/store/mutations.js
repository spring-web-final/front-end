export default {
  saveItem(state,payload){
    state.detailItem = payload;
  },
  initDate(state,payload) {
    state.dateSection = payload;
  }
}