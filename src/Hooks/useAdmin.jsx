import { useContext } from "react";
import { AuthContext } from "../Context/ContextProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAdmin = () => {
  const { user } = useContext(AuthContext);
  const axios = useAxiosSecure();
  const { data: isAdmin, isLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],
    queryFn: async () => {
      const res = await axios.get(`/user/admin/${user?.email}`);

      return res.data.admin;
    },
  });
  return [isAdmin, isLoading];
};

export default useAdmin;
