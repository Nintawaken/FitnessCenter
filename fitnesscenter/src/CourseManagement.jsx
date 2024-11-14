import { useState } from 'react';

function CourseManagement() {
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [instructor, setInstructor] = useState('');
  const [schedule, setSchedule] = useState('');
  const [error, setError] = useState('');
  const [editingCourseId, setEditingCourseId] = useState(null);

  // Handle adding or updating a course
  const handleAddCourse = (e) => {
    e.preventDefault();

    if (!courseName || !instructor || !schedule) {
      setError('All fields are required');
      return;
    }

    if (editingCourseId) {
      // Update the course
      setCourses(courses.map(course =>
        course.id === editingCourseId
          ? { ...course, courseName, instructor, schedule }
          : course
      ));
      setEditingCourseId(null); // Reset editing mode
    } else {
      // Add new course
      setCourses([
        ...courses,
        { id: Date.now(), courseName, instructor, schedule },
      ]);
    }

    // Reset form fields
    setCourseName('');
    setInstructor('');
    setSchedule('');
    setError('');
  };

  // Handle deleting a course
  const handleDeleteCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  // Handle editing a course
  const handleEditCourse = (id) => {
    const courseToEdit = courses.find(course => course.id === id);
    setCourseName(courseToEdit.courseName);
    setInstructor(courseToEdit.instructor);
    setSchedule(courseToEdit.schedule);

    // Set the course id for later updating
    setEditingCourseId(id);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Course Management</h1>
      <form onSubmit={handleAddCourse} className="space-y-4 bg-white p-6 rounded-lg shadow-lg">
        <div>
          <label htmlFor="courseName" className="block text-sm font-medium">Course Name</label>
          <input
            type="text"
            id="courseName"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="w-full p-3 mt-1 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="instructor" className="block text-sm font-medium">Instructor</label>
          <input
            type="text"
            id="instructor"
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
            className="w-full p-3 mt-1 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="schedule" className="block text-sm font-medium">Schedule</label>
          <input
            type="text"
            id="schedule"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            className="w-full p-3 mt-1 border border-gray-300 rounded-md"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          {editingCourseId ? 'Update Course' : 'Add Course'}
        </button>
      </form>

      {/* Display courses */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Available Courses</h2>
        <ul className="space-y-4">
          {courses.map(course => (
            <li key={course.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{course.courseName}</h3>
                <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>
                <p className="text-sm text-gray-500">Schedule: {course.schedule}</p>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => handleEditCourse(course.id)}
                  className="text-yellow-500 hover:text-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCourse(course.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CourseManagement;
