import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { PayPalButton } from 'react-paypal-button-v2';
import AppContext from '../context/AppContext';
import handleSumTotal from '../utils/handleSumTotal';
import pass from '../pass';
import '../styles/components/Payment.css';

function Payment() {
  const { state, addNewOrder, removeAllFromCart } = useContext(AppContext);
  const { cart, buyer } = state;
  const history = useHistory();
  const clientID = pass.paypalPaymentClientID;

  const paypalOptions = {
    clientId: clientID,
    intent: 'capture',
    currency: 'USD',
  };

  const buttonStyles = {
    layout: 'vertical',
    shape: 'rect',
  };

  const handlePaymentSuccess = (data) => {
    if (data.status === 'COMPLETED') {
      const newOrder = {
        buyer,
        product: cart,
        payment: data,
      };
      addNewOrder(newOrder);
      history.push('/checkout/success');
      removeAllFromCart();
    }
  };

  return (
    <div className="Payment">
      <div className="Payment-content">
        <h3>Resumen del pedido:</h3>
        {cart.map((item) => (
          <div className="Payment-item" key={item.title}>
            <div className="Payment-element">
              <h4>{item.title}</h4>
              <span>{item.quantify}</span>
              <span>${item.price * item.quantify}</span>
            </div>
          </div>
        ))}
        <div className="Payment-button">
          <PayPalButton
            paypalOptions={paypalOptions}
            buttonStyles={buttonStyles}
            amount={handleSumTotal(cart)}
            // onPaymentStart={() => console.log('Start Payment')}
            onSuccess={(data) => handlePaymentSuccess(data)}
            onError={(error) => console.error(error)}
            onCancel={(data) => console.log(data)}
          />
        </div>
      </div>
    </div>
  );
}

export default Payment;
