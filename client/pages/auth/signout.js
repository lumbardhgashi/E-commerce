import useRequest from "@/hooks/useRequest";
import Router from "next/router";
import { useEffect } from "react";

export default () => {
  const { doRequest } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => Router.push("/"),
  });

  useEffect(() => {
    doRequest()
  }, [])

  return <div>Signing out...</div>;
};
