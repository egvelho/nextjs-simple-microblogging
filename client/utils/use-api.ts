import React from "react";
import { useRouter } from "next/router";
import axios, { Method } from "axios";
import { createPubSub } from "client/utils/create-pubsub";
import { href } from "client/utils/href";
import { Token } from "client/utils/token";
import endpoints from "shared/consts/endpoints.json";

const texts = {
  sessionExpiredText: "Sua sessão expirou. Por favor, faça login",
  serverError:
    "Houve um erro desconhecido. Por favor, tente novamente mais tarde.",
};

const toggleLoadingState = createPubSub("toggleLoadingState");
const displayToastMessage = createPubSub("displayToastMessage");

export function useApi<RequestData, ResponseData>(
  method: Method,
  endpoint: keyof typeof endpoints
) {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const callEndpoint = async (data: RequestData) => {
    setLoading(true);
    toggleLoadingState.publish(true);
    const token = Token.get();
    const headers = token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : undefined;

    const axiosInstance = getAxiosInstance(method);
    const response = await axiosInstance(endpoints[endpoint], data, {
      headers,
    });

    setLoading(false);
    toggleLoadingState.publish(false);

    if (response.status === 401) {
      await router.push(href("signIn"));

      displayToastMessage.publish({
        message: texts.sessionExpiredText,
        error: false,
      });
    }

    if (response.status >= 500) {
      displayToastMessage.publish({
        message: texts.serverError,
        error: true,
      });
    }

    return response;
  };

  return {
    loading,
    callEndpoint,
  };
}

function getAxiosInstance(method: Method) {
  switch (method.toUpperCase()) {
    case "GET":
      return axios.get;
    case "POST":
      return axios.post;
    case "PUT":
      return axios.put;
    case "PATCH":
      return axios.patch;
    case "DELETE":
      return axios.delete;
    default:
      return axios.get;
  }
}
