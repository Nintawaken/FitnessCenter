import { useState, useEffect } from 'react';

function Subscription({ username }) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [membershipType, setMembershipType] = useState('');
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    setIsSubscribed(users[username]?.isPaid || false);
  }, [username]);

  const handlePaymentCompletion = (isPaymentSuccessful) => {
    if (isPaymentSuccessful) {
      // Simulate a successful payment and update user data
      const users = JSON.parse(localStorage.getItem('users')) || {};
      if (!users[username]) {
        users[username] = { isPaid: false };
      }
      users[username].isPaid = true;
      localStorage.setItem('users', JSON.stringify(users));
      setIsSubscribed(true);
      setIsPaymentCompleted(true);
    } else {
      alert('Payment failed or cancelled. Subscription not completed.');
    }

    // Close the payment popup regardless of success or failure
    setShowPaymentPopup(false);
  };

  const handleSubscribe = () => {
    if (!paymentMethod || !membershipType) {
      alert('Please select both payment method and membership type!');
      return;
    }
    setShowPaymentPopup(true);
  };

  const closeConfirmationPopup = () => {
    setShowConfirmation(false);
  };

  const closePaymentPopup = () => {
    setShowPaymentPopup(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Subscription</h2>
      <p className="mb-4">
        Subscription Status: <strong>{isSubscribed ? 'Active' : 'Not Subscribed'}</strong>
      </p>
      {!isSubscribed ? (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mt-2 p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Payment Method</option>
              <option value="TrueMoney">TrueMoney</option>
              <option value="PayPal">PayPal</option>
              <option value="CreditCard">Credit Card</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Membership Type</label>
            <select
              value={membershipType}
              onChange={(e) => setMembershipType(e.target.value)}
              className="mt-2 p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Membership Type</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>

          <button
            onClick={handleSubscribe}
            className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Subscribe Now
          </button>
        </>
      ) : (
        <p className="text-green-500">You are already subscribed!</p>
      )}

      {/* Payment Process Popup */}
      {showPaymentPopup && !isPaymentCompleted && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">Complete Payment</h3>
            <p>
              You selected <strong>{paymentMethod}</strong> as your payment method.
            </p>
            <p>Membership Type: <strong>{membershipType}</strong></p>
            <p>Please complete the payment process to activate your subscription.</p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => handlePaymentCompletion(true)}  // Simulate successful payment
                className="p-2 bg-green-500 text-white rounded-md"
              >
                Complete Payment
              </button>
              <button
                onClick={() => handlePaymentCompletion(false)} // Simulate failed/cancelled payment
                className="p-2 bg-red-500 text-white rounded-md"
              >
                Cancel Payment
              </button>
            </div>
            <button
              onClick={closePaymentPopup}
              className="mt-4 p-2 bg-gray-500 text-white rounded-md"
            >
              Close Payment Popup
            </button>
          </div>
        </div>
      )}

      {/* Payment Confirmation Popup */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">Payment Confirmation</h3>
            <p>Your subscription has been successfully processed!</p>
            <p>Payment Method: {paymentMethod}</p>
            <p>Membership Type: {membershipType}</p>
            <button
              onClick={closeConfirmationPopup}
              className="mt-4 p-2 bg-green-500 text-white rounded-md"
            >
              Close Confirmation Popup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Subscription;
