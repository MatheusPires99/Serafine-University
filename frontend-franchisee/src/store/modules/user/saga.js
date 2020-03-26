import { all, takeLatest, call, put } from "redux-saga/effects";
import { toast } from "react-toastify";

import api from "~/services/api";
import history from "~/services/history";

import {
  updateProfileSuccess,
  updateProfileFailure,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  resetPasswordSuccess,
  resetPasswordFailure
} from "./actions";

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;

    const user = { name, email, ...(rest.oldPassword ? rest : {}) };

    const response = yield call(api.put, "franchisee_user", user);

    toast.success("Perfil atualizado com sucesso");

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    toast.error("Erro ao tentar atualizar perfil, confira seus dados");
    yield put(updateProfileFailure());
  }
}

export function* forgotPassword({ payload }) {
  try {
    const { email } = payload;

    const response = yield call(api.post, "forgot_password", {
      email
    });

    const { token, date } = response.data;

    yield put(forgotPasswordSuccess(token, date));

    toast.success("Quase lá, dê uma checada no seu e-mail");
    history.push("/");
  } catch (err) {
    toast.error("E-mail inválido");
    yield put(forgotPasswordFailure());
  }
}

export function* resetPassword({ payload }) {
  try {
    const { token, password } = payload;

    const response = yield call(api.post, "reset_password", {
      token,
      password
    });

    const { user } = response.data;

    yield put(resetPasswordSuccess(user));

    toast.success("Sua senha foi alterada");
    history.push("/");
  } catch (err) {
    toast.error("Algo deu errado");
    yield put(resetPasswordFailure());
  }
}

export default all([
  takeLatest("@user/UPDATE_PROFILE_REQUEST", updateProfile),
  takeLatest("@user/FORGOT_PASSWORD_REQUEST", forgotPassword),
  takeLatest("@user/RESET_PASSWORD_REQUEST", resetPassword)
]);
