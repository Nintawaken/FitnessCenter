import { useState, useEffect } from 'react';

function CourseEnroll({ customerType }) {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    setCourses(storedCourses);

    const storedEnrollments = JSON.parse(localStorage.getItem('enrolledCourses')) || [];
    setEnrolledCourses(storedEnrollments);
  }, []);

  const handleEnroll = (courseId) => {
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
      <div>
        <h2 className="text-xl font-semibold mb-4">Available Courses</h2>
        <ul className="space-y-4">
          {courses.map(course => (
            <li key={course.id} className="bg-white p-4 rounded-lg shadow-md">
              <div>
                <h3 className="text-lg font-semibold">{course.courseName}</h3>
                <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>
                <p className="text-sm text-gray-500">Schedule: {course.schedule}</p>
              </div>

              {/* Only "paid" users can enroll, others can only view */}
              {customerType === 'paid' ? (
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => handleEnroll(course.id)}
                    className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Enroll
                  </button>
                </div>
              ) : (
                <p className="text-gray-500 text-sm mt-2">
                  {customerType === 'admin' || customerType === 'user'
                    ? 'You can only view this course. Enrollments are restricted to Paid users.'
                    : 'You need to be a Paid member to enroll.'}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CourseEnroll;
