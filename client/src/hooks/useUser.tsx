import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getCurrentUser } from "../api/user/getCurrentUser";

import { getToken } from "../helpers";
import { toast } from "react-toastify";


const useUser = () => {
  const { data, refetch, isLoading } = useQuery(["profile/get"], getCurrentUser, {
    initialData: []
  });

  return { isLoading, user: data, refetch };
};

export default useUser;
