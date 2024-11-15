import { useState } from 'react';

function CourtReservation({ userRole }) {  // Accept the user role as a prop
  // State for available courts
  const [courts, setCourts] = useState([
    { id: 1, name: 'Court 1', isAvailable: true, reservedBy: null },
    { id: 2, name: 'Court 2', isAvailable: false, reservedBy: null },
    { id: 3, name: 'Court 3', isAvailable: true, reservedBy: null },
    { id: 4, name: 'Court 4', isAvailable: true, reservedBy: null },
  ]);

  // State for the confirmation message
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [selectedCourtId, setSelectedCourtId] = useState(null); // Track the selected court for cancellation

  // Function to handle court booking
  const handleBookCourt = (courtId, courtName) => {
    if (userRole === 'paid') { // Only allow booking for paid users
      setCourts((prevCourts) =>
        prevCourts.map((court) =>
          court.id === courtId
            ? { ...court, isAvailable: false, reservedBy: 'user' } // Mark as reserved
            : court
        )
      );

      setConfirmationMessage(`You have successfully reserved ${courtName}. Enjoy your game!`);
      setSelectedCourtId(courtId); // Track the booked court for cancellation
    } else {
      setConfirmationMessage(`You must be a paid user to book a court.`);
    }
  };

  // Function to handle court cancellation
  const handleCancelReservation = (courtId, courtName) => {
    setCourts((prevCourts) =>
      prevCourts.map((court) =>
        court.id === courtId
          ? { ...court, isAvailable: true, reservedBy: null } // Mark as available again
          : court
      )
    );

    setConfirmationMessage(`You have successfully cancelled your reservation for ${courtName}.`);
    setSelectedCourtId(null); // Reset selected court ID
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Court Reservation</h2>
      <p>Select a court to reserve your spot!</p>

      {/* Show confirmation message if available */}
      {confirmationMessage && (
        <div className="mt-4 p-4 bg-green-200 text-green-800 rounded-md">
          <p>{confirmationMessage}</p>
        </div>
      )}

      <div className="mt-6">
        {courts.map((court) => (
          <div
            key={court.id}
            className={`p-4 mb-4 rounded-md shadow-sm ${
              court.isAvailable ? 'bg-green-200' : 'bg-gray-200'
            }`}
          >
            <div className="flex justify-between">
              <span className="font-semibold">{court.name}</span>
              <span className={`font-medium ${court.isAvailable ? 'text-green-500' : 'text-gray-500'}`}>
                {court.isAvailable ? 'Available' : 'Not Available'}
              </span>
            </div>

            {/* If court is available */}
            {court.isAvailable ? (
              <button
                onClick={() => handleBookCourt(court.id, court.name)}
                disabled={userRole !== 'paid'} // Disable booking for non-paid users
                className={`mt-2 w-full p-3 ${
                  userRole === 'paid' ? 'bg-blue-500' : 'bg-gray-500'
                } text-white rounded-md hover:bg-blue-600`}
              >
                {userRole !== 'paid' ? 'View Only' : 'Book Court'}
              </button>
            ) : (
              // If court is reserved by user, show cancel button
              court.reservedBy === 'user' ? (
                <button
                  onClick={() => handleCancelReservation(court.id, court.name)}
                  className="mt-2 w-full p-3 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Cancel Reservation
                </button>
              ) : (
                <button
                  disabled
                  className="mt-2 w-full p-3 bg-gray-500 text-white rounded-md cursor-not-allowed"
                >
                  Court Unavailable
                </button>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourtReservation;
