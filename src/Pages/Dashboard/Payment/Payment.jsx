import React from 'react'
import SectionTitle from '../../../Components/SectionTitle/SectionTitle'
import useDynamicTitle from '../../../Hooks/useDynamicTitle'
import CheckoutForm from './CheckoutForm'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK); 

const Payment = () => {
    useDynamicTitle('Payment')
  return (
    <div>
        <div>
            <SectionTitle heading={'Payment'} subheading={'Please process'} />
        </div>

        <Elements stripe={stripePromise}>
        <CheckoutForm />
        </Elements>
    </div>
  )
}

export default Payment