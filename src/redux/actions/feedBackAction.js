import {
  FEEDBACK_SUBMIT_REQUEST,
  FEEDBACK_SUBMIT_DONE,
} from "../constants/feedBackConstant";
import axios from "axios";
import { toast } from "react-toastify";

export const submitFeedbackHandler = (request) => async (dispatch) => {
  console.log(request);
  dispatch({ type: FEEDBACK_SUBMIT_REQUEST });
  try {
    const { data } = await axios.post(
      "https://gembulcimotbackend.onrender.com/feedback/create",
      request
    );
    dispatch({
      type: FEEDBACK_SUBMIT_DONE,
      payload: data,
    });
    toast.success("Kirim masukkan berhasil");
  } catch (error) {
    toast.error(error.response.data.error);
  }
};
