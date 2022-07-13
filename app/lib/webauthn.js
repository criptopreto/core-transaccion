import Axios from "../services/auth.services";

export async function saveChallenge({ user_id, challenge }) {
  let respuesta = await Axios("POST", "/auth/webauthn/challenge", {
    user_id,
    challenge,
  });
  console.log(respuesta);
}

export async function getChallenge({ user_id }) {
  let response = await Axios("POST", "/auth/webauthn/get_challenge", {
    user_id,
  });
  console.log(response);
  return response.data;
}

export async function saveCredential({ credential }) {
  let respuesta = await Axios("POST", "/auth/webauthn/credential", {
    credential,
  });
  console.log(respuesta);
}

export async function getCredential(user_id) {
  let response = await Axios("POST", "/auth/webauthn/get_credential", {
    user_id: user_id,
  });
  return response;
}
