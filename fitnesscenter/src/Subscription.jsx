import { useState, useEffect } from 'react';

function Subscription({ username }) {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    setIsSubscribed(users[username]?.isPaid || false);
  }, [username]);

  const handleSubscribe = () => {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (!users[username]) {
      users[username] = { isPaid: false };
    }
    users[username].isPaid = true;
    localStorage.setItem('users', JSON.stringify(users));
    setIsSubscribed(true);
    alert('Subscription successful!');
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Subscription</h2>
      <p className="mb-4">
        Subscription Status: <strong>{isSubscribed ? 'Active' : 'Not Subscribed'}</strong>
      </p>
      {!isSubscribed ? (
        <button
          onClick={handleSubscribe}
          className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Subscribe Now
        </button>
      ) : (
        <p className="text-green-500">You are already subscribed!</p>
      )}
    </div>
  );
}

export default Subscription;
