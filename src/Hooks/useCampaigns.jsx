import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";
import useAuth from "./useAuth";

const useCampaigns = () => {
  const axiosCommon = useAxiosCommon();
  const { user, loading } = useAuth();
  const { data: donationCampaigns, isLoading, refetch } = useQuery({
    queryKey: ["donationCampaigns"],
    enabled: !loading && !!user,
    queryFn: async () => {
      const { data } = await axiosCommon.get("/donationCampaigns");
      return data;
    },
  });
  return {donationCampaigns, isLoading, refetch}
};

export default useCampaigns;
