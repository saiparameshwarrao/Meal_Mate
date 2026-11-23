import React, { useState } from "react";
import "./Payment.css";
import jsPDF from "jspdf";
import QRCode from "react-qr-code";
import { API } from "../config";

const Payment = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [
    { name: "Indian Veg Bowl", quantity: 2, frequency: "weekly", price: 360 },
    { name: "Chinese Iced Tea", quantity: 1, frequency: "once", price: 140 },
  ];

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [upiId, setUpiId] = useState("");
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "" });

  const getTotal = () => cart.reduce((acc, item) => acc + item.price, 0);

  const handleInvoiceDownload = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Invoice", 20, 20);
    let y = 40;
    cart.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.name} - ₹${item.price} (${item.frequency}) x ${item.quantity}`, 20, y);
      y += 10;
    });
    doc.text(`Total: ₹${getTotal()}`, 20, y + 10);
    doc.save("invoice.pdf");
  };

  const handlePlaceOrder = async () => {
    const stored = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = stored.userId;

    if (!userId) {
      alert("Please log in before placing an order.");
      return;
    }

    try {
      const response = await fetch(`${API}/api/place-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          items: cart.map(({ name, price, quantity }) => ({ name, price, quantity })),
          totalAmount: getTotal(),
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to place order");
      }
      alert("Order placed successfully!");
      localStorage.removeItem("cart");
    } catch (error) {
      alert(error.message || "Failed to place order");
    }
  };

  return (
    <div className="payment-container">
      <h1 className="payment-heading">Payment</h1>

      <h2>Cart Items</h2>
      <ul className="cart-list">
        {cart.map((item, index) => (
          <li key={index}>
            {item.name} - ₹{item.price} ({item.frequency}) x {item.quantity}
          </li>
        ))}
      </ul>
      <h3 className="total-price">Total: ₹{getTotal()}</h3>

      <h2>Payment Method</h2>
      <div className="payment-methods" onChange={(e) => setPaymentMethod(e.target.value)}>
        <label>
          <input type="radio" name="payment" value="cod" defaultChecked /> Cash on Delivery
        </label>
        <label>
          <input type="radio" name="payment" value="upi" /> UPI
        </label>
        <label>
          <input type="radio" name="payment" value="card" /> Credit/Debit Card
        </label>
      </div>

      {/* Show UPI options */}
      {paymentMethod === "upi" && (
        <div className="upi-section">
          <label>Enter your UPI ID:</label>
          <input
            type="text"
            placeholder="yourname@upi"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
          />
          <p>Scan to pay:</p>
          <QRCode value={`upi://pay?pa=yourupi@bank&pn=YourName&am=${getTotal()}&cu=INR`} size={128} />
        </div>
      )}

      {/* Show Card options */}
      {paymentMethod === "card" && (
        <div className="card-section">
          <label>Card Number:</label>
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            value={cardDetails.number}
            onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
          />
          <label>Expiry Date:</label>
          <input
            type="text"
            placeholder="MM/YY"
            value={cardDetails.expiry}
            onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
          />
          <label>CVV:</label>
          <input
            type="password"
            placeholder="123"
            value={cardDetails.cvv}
            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
          />
        </div>
      )}

      <button className="invoice-btn" onClick={handleInvoiceDownload}>
        Download Invoice
      </button>

      <button className="place-order-btn" onClick={handlePlaceOrder}>
        Place Order
      </button>
    </div>
  );
};

export default Payment;
