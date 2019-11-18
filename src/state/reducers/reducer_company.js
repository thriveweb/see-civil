const companyReducer = (state = {}, action) => {
  const { payload = null } = action

  if (action.type === `SET_ACTIVE_COMPANY`) {
      return payload
  }
  return state
}

export default companyReducer
