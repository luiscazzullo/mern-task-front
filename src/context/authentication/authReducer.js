import {
  SUCCESS_REGISTER,
  ERROR_REGISTER,
  GET_USER,
  SUCCESS_LOGIN,
  ERROR_LOGIN,
  LOG_OFF,
} from "../../types";
export default (state, action) => {
  switch (action.type) {
    case SUCCESS_LOGIN:
    case SUCCESS_REGISTER:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        auth: true,
        message: null,
        loading: false,
      };
    case LOG_OFF:
    case ERROR_LOGIN:
    case ERROR_REGISTER:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        auth: null,
        user: null,
        loading: false,
        message: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        token: localStorage.getItem('token'),
        auth: true,
        loading: false,
        user: action.payload,
      };
    default:
      return state;
  }
};
