import express, { json } from "express"
import stripe from "stripe"
import cors from "cors"

const app = express()

// Otro token de stripe
// const stripe = new Stripe("") 

app.use(cors({origin: "http://localhost:5173" }))
app.use(json())

app.post("/api/checkout", (req, res) => {

    // const {id, amount} = req.body

    // await stripe.PaymentIntentsResource.create({
    //     amount,
    //     currency: "USD",
    //     description: ""
    // })

    res.send("recivido: ", req.body)
})

app.listen(3001, () => {
    console.log("Servidor en server: ", 3001)
})

