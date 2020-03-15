const initialState = {
  mailsReducer: {
    error: null,
    mails: [],
    selectedMails: [],
    lastSelectedMail: null,
  },
  statusReducer: {
    status: "All Requests",
  },
  searchReducer: {
    search: ""
  }
}

export default initialState;