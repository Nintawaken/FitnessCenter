import { useState, useEffect } from 'react';

function CourseEnroll() {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // Load courses from localStorage when component mounts
  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    setCourses(storedCourses);
  }, []);

  // Handle course enrollment
  const handleEnroll = (course) => {
    if (!enrolledCourses.some((enrolled) => enrolled.id === course.id)) {
      setEnrolledCourses([...enrolledCourses, course]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Course Enrollment</h1>
      <div className="space-y-4">
        {courses.length === 0 ? (
          <p>No courses available for enrollment.</p>
        ) : (
          courses.map((course) => (
            <div key={course.id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{course.courseName}</h3>
              <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>
              <p className="text-sm text-gray-500">Schedule: {course.schedule}</p>
              <button
                onClick={() => handleEnroll(course)}
                className="mt-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Enroll
              </button>
            </div>
          ))
        )}
      </div>
      {enrolledCourses.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Enrolled Courses</h2>
          <ul className="space-y-4">
            {enrolledCourses.map((course) => (
              <li key={course.id} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">{course.courseName}</h3>
                <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>
                <p className="text-sm text-gray-500">Schedule: {course.schedule}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CourseEnroll;
