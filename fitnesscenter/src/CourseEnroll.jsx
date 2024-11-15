import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CourseEnroll({ username }) {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isPaid, setIsPaid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    setCourses(storedCourses);

    const storedEnrollments = JSON.parse(localStorage.getItem('enrolledCourses')) || [];
    setEnrolledCourses(storedEnrollments);

    const users = JSON.parse(localStorage.getItem('users')) || {};
    setIsPaid(users[username]?.isPaid || false);
  }, [username]);

  const handleEnroll = (courseId) => {
    if (!isPaid) {
      alert('You need to subscribe to enroll in courses.');
      navigate('/subscription');
      return;
    }

    if (enrolledCourses.includes(courseId)) {
      alert('You are already enrolled in this course');
      return;
    }

    const updatedEnrollments = [...enrolledCourses, courseId];
    setEnrolledCourses(updatedEnrollments);
    localStorage.setItem('enrolledCourses', JSON.stringify(updatedEnrollments));
    alert('Enrolled successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Course Enrollment</h1>
      <ul className="space-y-4">
        {courses.map((course) => (
          <li key={course.id} className="bg-white p-4 rounded-lg shadow-md">
            <div>
              <h3 className="text-lg font-semibold">{course.courseName}</h3>
              <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>
              <p className="text-sm text-gray-500">Schedule: {course.schedule}</p>
            </div>
            <button
              onClick={() => handleEnroll(course.id)}
              className={`p-2 ${
                isPaid ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'
              } text-white rounded-md`}
              disabled={!isPaid}
            >
              {isPaid ? 'Enroll' : 'Subscribe to Enroll'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseEnroll;
