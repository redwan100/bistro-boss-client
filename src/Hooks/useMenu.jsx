
import { useQuery } from "@tanstack/react-query";

const useMenu = () => {



  const {data: menu =[], isLoading, refetch} = useQuery({
    queryKey:['menu'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/menu')

      return res.json();
    }
  })


  return [menu, isLoading, refetch];
};

export default useMenu;
