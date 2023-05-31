import {useQuery} from '@tanstack/react-query'
import { useContext } from 'react';
import { AuthContext } from '../Context/ContextProvider';
import useAxiosSecure from './useAxiosSecure';

const useCart = () => {
const {user, loading} = useContext(AuthContext);

// const token = localStorage.getItem('access-token');
const axios = useAxiosSecure()


 const {refetch, isLoading,data:cart = []} = useQuery({
   queryKey: ["cart", user?.email],
  //  queryFn: async () =>{
  //   const res = await fetch(`http://localhost:5000/carts?email=${user?.email}`, {
  //     headers:{
  //       authorization:`bearer ${token}`
  //     }
  //   });


  // enabled:!!user?.email &&!! localStorage.getItem('access-token'),

  enabled: !loading,
   queryFn: async () =>{
    const res = await axios(`/carts?email=${user?.email}`);
    console.log(res);
    return res.data;
   }
 });

 return [cart, refetch,isLoading]
}

export default useCart;