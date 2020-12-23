import React, { useState, useRef, useEffect } from 'react'
import './App.css';
import chair from './chair.jpg'
import gif from './gif.gif'
function App() {
  const [paidFor, setPaidFor] = useState(false)
  const [loaded, setLoaded] = useState(false)
  let paypalRef = useRef()
  const product = {
    price: 666.66,
    description: 'fancy chair',
    img: "assets/chair.jpg"
  }
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://www.paypal.com/sdk/js?client-id=ATJ_mzssWj2Nb8N86vJVITm_Ilf1e88mmQTjLVTY6R0uUd4NB7-Ur3Ffw7pPWe8ZQx6qNCVw1FC8C0ax"
    script.addEventListener("load", () => { setLoaded(true) })
    document.body.appendChild(script);
    if (loaded) {
      setTimeout(() => {
        window.paypal.Buttons({
          createOrder: (data, action) => {

            return action.order.create({
              purchase_units: [
                {
                  description: product.description,
                  amount: {
                    currency_code: "USD",
                    value: product.price
                  }
                }
              ]
            })
          }, onApprove: async (data, actions) => {
            const order = await actions.order.capture()
            setPaidFor(true)
            console.log(order);
          }
        }).render(paypalRef)
      })
    }
  })
  return (
    <div className="App">
      {paidFor ? (<div>
        <h1>Congrats, you just bough comfy chair!</h1>
        <img src={gif} alt="" width="200" />

      </div>) : (
          <div>
            <h1>{product.description} for${product.price}</h1>
            <img src={chair} alt="" width="200" />
            <div ref={v => (paypalRef = v)}></div>
          </div>
        )}
    </div>
  );
}

export default App;
