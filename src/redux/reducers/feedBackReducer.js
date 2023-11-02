import {
  FEEDBACK_SUBMIT_REQUEST,
  FEEDBACK_SUBMIT_DONE,
} from "../constants/feedBackConstant";

export const feedbackHandler = (state = {}, action) => {
  switch (action.type) {
    case FEEDBACK_SUBMIT_REQUEST:
      return { loading: true };
    case FEEDBACK_SUBMIT_DONE:
      return { loading: false };
    default:
      return state;
  }
};
