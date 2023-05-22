import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getCurrentUser } from "../api/user/getCurrentUser";

import { getToken } from "../helpers";


const useUser = () => {
  const { data, refetch, isLoading } = useQuery(["profile/get"], getCurrentUser,);

  return { isLoading, user: data };
};

export default useUser;
