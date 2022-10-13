import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js" // Lo que envuelve tiene acceso a stripe (como provider)
import axios from "axios"

import "bootswatch/dist/lux/bootstrap.min.css";
import "./App.css"

// Cargar la libreria ( el key viene de la pagina "clave publica" )
const stripePromise = loadStripe("pk_test_51LsRIWHTnfMKSzgn7FZwVzlncT7M6JYKLmdqRat9AKozeicJ4oFL2x8lPCGtl5qYl6MlQk8PwhNU2uSfgYSVSOLP00L283dQCn")

const App = () => {

    return (
        <div className="bodyApp">
            <Elements stripe={stripePromise}>
                <div className="container p-4">
                    <div className="row">
                        <div className="col-md-4 offset-md-4">
                            <StripeForm />
                        </div>
                    </div>
                </div>
            </Elements> 
        </div>
    )
}

const StripeForm = () => {
    
    const strite = useStripe()
    const elements = useElements()
    
    const handleSubmit = async (event) => {
        event.preventDefault()
    
        const {error, paymentMethod} = await strite.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })

        if (!error) {
            console.log("no existe error", paymentMethod)
            const {id} = paymentMethod

            const {data} = await axios.post("http://localhost:3001/api/checkout", {
                id,
                amount: 1000 // en centavos
            })
            console.log("DATA que se envia al backend: ", data)
        }
    }
    
    return (
        <form onSubmit={handleSubmit} className="card card-body">
            <img src="https://soporte.mygestion.com/media/wp-content/uploads/ventas.jpg" alt="img" className="img-fluid"/>
            <h3 className="text-center my-2"> Price: $10</h3>
            <div className="form-group">
                <CardElement className="form-control"/>
            </div>
            <button className="btn btn-success"> Buy </button>
        </form>
    )
} 

export default App
