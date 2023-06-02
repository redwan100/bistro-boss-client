import React, { useState } from 'react'
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js'
const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements()
    const [error, setError] = useState('')
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
    }
  return (
    <div>
      <form onSubmit={handleSubmit} className="p-4">
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
          disabled={!stripe}
          className="btn btn-outline text-gray-800 my-3"
        >
          Pay
        </button>
      </form>
      {error}
    </div>
  );
}

export default CheckoutForm