import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";
import useAuth from "./useAuth";
import { useEffect, useState } from "react";

const useCampaigns = () => {
  const axiosCommon = useAxiosCommon();
  const { user, loading } = useAuth();
  const [scrollLoading, setScrollLoading] = useState(true);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [perPage, setPerPage] = useState(3);

  function debounce(fn, delay) {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }

  const handleScroll = debounce(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      if (!allDataLoaded) {
        setScrollLoading(true);
        setPerPage((prev) => {
          if (window.innerWidth >= 768) {
            return prev + 3;
          } else {
            return prev + 1;
          }
          });
          // Adjust scroll position to prevent immediate re-triggering
          // window.scrollBy(0, -5);
      }
    }
  }, 500); // 500ms delay for debounce
  // console.log(perPage);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [allDataLoaded]);

  const {
    data: donationCampaigns,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["donationCampaigns", perPage],
    enabled: !loading && !!user,
    queryFn: async () => {
      const { data } = await axiosCommon.get(
        `/donationCampaigns?per_page=${perPage}`
      );
      setScrollLoading(false);
      // Check if the returned data length is less than perPage
      if (data.length < perPage) {
        setAllDataLoaded(true); // no more data to load
      }
      return data;
    },
  });
  return { donationCampaigns, isLoading, refetch, allDataLoaded };
};

export default useCampaigns;
