import React, { useContext, useEffect, useState } from 'react'
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js'
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { AuthContext } from '../../../Context/ContextProvider';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// import './CheckoutForm.css'


const CheckoutForm = ({price, cart}) => {
    const stripe = useStripe();
    const elements = useElements()
    const {user} = useContext(AuthContext)
    const [error, setError] = useState('')
    const [axiosSecure] = useAxiosSecure()
    const [clientSecret, setClientSecret] = useState('')
    const [processing, setProcessing] = useState(false)
    const [transactionId, setTransactionId] = useState('')

    const navigate = useNavigate()

    useEffect(()=>{
       if(price > 0) {
         axiosSecure.post("/create-payment-intent", { price }).then((res) => {
           console.log(res.data.clientSecret);
           setClientSecret(res.data.clientSecret);
         });
       }
    },[])

    const handleSubmit = async(event) =>{
        event.preventDefault()
        setError('')
        if(!stripe || !elements){
            return 
        }

        const card = elements.getElement(CardElement)
        if(card === null){
            return
        }


        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type:'card',
            card
        })

        if(error){
            setError(error.message);
        }else{
            console.log('payment', paymentMethod);
        }

        setProcessing(true)

        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
            payment_method:{
                card: card,
                billing_details:{
                    email:user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if(confirmError){
            console.log(confirmError);
        }

        console.log(paymentIntent);

        setProcessing(false)

        if(paymentIntent.status === 'succeeded'){
            setTransactionId(paymentIntent.id)
            const transactionId = paymentIntent.id;

            const payment ={
                email: user?.email,
                transactionId,
                date: new Date(),
                price,
                quantity: cart.length,
                cartItemsName: cart.map((item) => item.name),
                foodId: cart.map(item => item.foodId),
                status: 'pending',
                cartItemsId: cart.map((item) => item._id)
            }

            axiosSecure.post('/payments', payment)
            .then(res =>{
                console.log(res.data);
                if(res.data.result.insertedId){
                    Swal.fire({
                      position: "top-center",
                      icon: "success",
                      title: `Thank You MR ${user?.displayName || ''} Your pay has been received`,
                      showConfirmButton: false,
                      timer: 3000,
                    });
                    navigate('/dashboard/myCart')
                }
            })

            console.log(payment);
        }
    }


  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white h-46 p-4 rounded-md shadow-md my-32 border"
      >
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          disabled={!stripe || !clientSecret || processing}
          className="mt-20 w-full btn-warning btn btn-xs"
        >
          Pay
        </button>
      </form>
      {error && <h3 className="text-red-500 text-center">{error}</h3>}
      {transactionId && (
        <h3 className=" text-center">
          Transaction complete with transaction id: <span className='text-green-500 font-medium'>{transactionId}</span>{" "}
        </h3>
      )}
    </div>
  );
}

export default CheckoutForm