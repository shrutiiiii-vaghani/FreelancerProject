import React, { useState } from 'react';


const PaymentTracker = () => {

  const [payments, setPayments] = useState([]);
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('unpaid');

  const addPayment = (e) => {
    e.preventDefault();
    const newPayment = { amount, status };
    setPayments([...payments, newPayment]);
    setAmount('');
  };

  const markAsPaid = (index) => {
    const updatedPayments = payments.map((payment, i) => 
      i === index ? { ...payment, status: 'paid' } : payment
    );
    setPayments(updatedPayments);
  };

  return (
   <div className="payment-tracker" style={{textAlign:'center'}}>
      <h3>Payment Tracker</h3>
      <form onSubmit={addPayment}>
        <input 
          type="number" 
          placeholder="Amount" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          required 
        /><br/><br/>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="unpaid">Unpaid</option>
          <option value="paid">Paid</option>
        </select><br/><br/>
        <button type="submit">Add Payment</button>
      </form>

      <ul style={{listStyle:'none'}}>
        {payments.map((payment, index) => (
          <li key={index}>
            Amount: ${payment.amount}, Status: {payment.status}
            {payment.status === 'unpaid' && <button onClick={() => markAsPaid(index)}>Mark as Paid</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentTracker;

