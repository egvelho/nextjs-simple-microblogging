import React from "react";
import { useRouter } from "next/router";
import axios, { Method, AxiosResponse } from "axios";
import { createPubSub } from "client/utils/create-pubsub";
import { href } from "client/utils/href";
import { Token } from "client/utils/token";
import endpoints from "shared/consts/endpoints.json";

const texts = {
  sessionExpiredText: "Sua sessão expirou. Por favor, faça login",
  serverError:
    "Houve um erro desconhecido. Por favor, tente novamente mais tarde.",
};

const toggleAuthState = createPubSub("toggleAuthState");
const displayToastMessage = createPubSub("displayToastMessage");

export function useApi<RequestData, ResponseData>(
  method: Method,
  endpoint: keyof typeof endpoints
) {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const callEndpoint = async (data: RequestData) => {
    setLoading(true);
    const token = Token.get();
    const headers = token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : undefined;

    const response: AxiosResponse = await axios({
      method,
      url: endpoints[endpoint],
      data,
      headers,
      validateStatus: () => true,
    });

    setLoading(false);

    if (response.status === 401) {
      Token.remove();
      toggleAuthState.publish(false);
      await router.push(href("signIn"));

      displayToastMessage.publish({
        message: texts.sessionExpiredText,
        error: false,
      });

      return {} as AxiosResponse;
    }

    if (response.status >= 500) {
      displayToastMessage.publish({
        message: texts.serverError,
        error: true,
      });

      return {} as AxiosResponse;
    }

    return response;
  };

  return {
    loading,
    callEndpoint,
  };
}
