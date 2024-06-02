import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";
import useAuth from "./useAuth";

const useRole = () => {
  const axiosCommon = useAxiosCommon();
  const { user, loading } = useAuth();
  const { data: role, isLoading } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/role/${user?.email}`);
      return data;
    },
  });
  return { role, isLoading };
};

export default useRole;
