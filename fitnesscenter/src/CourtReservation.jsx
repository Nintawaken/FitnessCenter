import { useState, useEffect } from 'react';

function CourtReservation({ username }) {
  const [isPaid, setIsPaid] = useState(false);
  const [courts, setCourts] = useState([
    { id: 1, name: 'Court 1', isAvailable: true, reservedBy: null },
    { id: 2, name: 'Court 2', isAvailable: false, reservedBy: 'user1' },
    { id: 3, name: 'Court 3', isAvailable: true, reservedBy: null },
    { id: 4, name: 'Court 4', isAvailable: true, reservedBy: null },
  ]);

  const [confirmationMessage, setConfirmationMessage] = useState('');

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const user = users[username];
    if (user && user.isPaid) {
      setIsPaid(true);
    } else {
      setIsPaid(false);
    }
  }, [username]);

  const handleBookCourt = (courtId, courtName) => {
    if (isPaid) {
      setCourts((prevCourts) =>
        prevCourts.map((court) =>
          court.id === courtId
            ? { ...court, isAvailable: false, reservedBy: username }
            : court
        )
      );
      setConfirmationMessage(`You have successfully reserved ${courtName}. Enjoy your game!`);
    } else {
      setConfirmationMessage('You must be a paid user to book a court.');
    }
  };

  const handleCancelReservation = (courtId, courtName) => {
    setCourts((prevCourts) =>
      prevCourts.map((court) =>
        court.id === courtId && court.reservedBy === username
          ? { ...court, isAvailable: true, reservedBy: null }
          : court
      )
    );
    setConfirmationMessage(`You have successfully canceled your reservation for ${courtName}.`);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Court Reservation</h2>
      <p>Select a court to reserve your spot!</p>

      {confirmationMessage && (
        <div className="mt-4 p-4 bg-green-200 text-green-800 rounded-md">
          {confirmationMessage}
        </div>
      )}

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {courts.map((court) => (
          <div key={court.id} className="flex justify-between items-center mb-2 p-4 bg-gray-100 rounded-lg">
            <span>{court.name}</span>
            <div className="space-x-2">
              {court.isAvailable ? (
                <button
                  onClick={() => handleBookCourt(court.id, court.name)}
                  className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                >
                  Reserve
                </button>
              ) : court.reservedBy === username ? (
                <button
                  onClick={() => handleCancelReservation(court.id, court.name)}
                  className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
                >
                  Cancel Reservation
                </button>
              ) : (
                <span className="px-4 py-2 rounded-md bg-gray-500 text-white">
                  Reserved
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourtReservation;
