import SectionTitle from '../../../Components/SectionTitle/SectionTitle'
import useDynamicTitle from '../../../Hooks/useDynamicTitle'
import CheckoutForm from './CheckoutForm'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import useCart from '../../../Hooks/useCart'

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK); 

const Payment = () => {
    useDynamicTitle('Payment')

    const [cart] = useCart()
    const total = cart.reduce((acc, cur) =>{
        acc += cur.price;
        return acc;
    },0)

    const price= parseFloat(total.toFixed(2))
  return (
    <div className='h-full w-full'>
        <div>
            <SectionTitle heading={'Payment'} subheading={'Please process'} />
        </div>

        <Elements stripe={stripePromise}>
        <CheckoutForm price={price} cart={cart}/>
        </Elements>
    </div>
  )
}

export default Payment