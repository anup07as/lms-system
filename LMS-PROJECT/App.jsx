import React, { useState } from 'react';
import { BookOpen, Users, BarChart, Settings, FileText, Award, TrendingUp } from 'lucide-react';

const LMS = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([
    { id: 1, name: 'Admin User', email: 'admin@lms.com', role: 'admin', password: 'admin' },
    { id: 2, name: 'John Instructor', email: 'john@lms.com', role: 'instructor', password: 'inst' },
    { id: 3, name: 'Jane Student', email: 'jane@lms.com', role: 'student', password: 'stud' }
  ]);
  const [courses, setCourses] = useState([
    { id: 1, title: 'Web Development', description: 'Learn HTML, CSS, JS', instructor: 2, enrolled: [3] },
    { id: 2, title: 'Data Science', description: 'Python and ML basics', instructor: 2, enrolled: [] }
  ]);
  const [assignments, setAssignments] = useState([
    { id: 1, courseId: 1, title: 'Build a Website', submissions: [{ studentId: 3, grade: 85, feedback: 'Good work!' }] }
  ]);

  // Login
  const handleLogin = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) setCurrentUser(user);
  };

  // Admin Functions
  const addUser = (name, email, role) => {
    setUsers([...users, { id: Date.now(), name, email, role, password: 'default' }]);
  };

  const deleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const addCourse = (title, description) => {
    setCourses([...courses, { id: Date.now(), title, description, instructor: currentUser.id, enrolled: [] }]);
  };

  const deleteCourse = (id) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  // Instructor Functions
  const gradeAssignment = (assignmentId, studentId, grade, feedback) => {
    setAssignments(assignments.map(a => 
      a.id === assignmentId 
        ? { ...a, submissions: a.submissions.map(s => s.studentId === studentId ? { ...s, grade, feedback } : s) }
        : a
    ));
  };

  // Student Functions
  const enrollCourse = (courseId) => {
    setCourses(courses.map(c => 
      c.id === courseId ? { ...c, enrolled: [...c.enrolled, currentUser.id] } : c
    ));
  };

  // Login Screen
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
          <div className="flex items-center justify-center mb-6">
            <BookOpen className="w-12 h-12 text-blue-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-800">LMS Portal</h1>
          </div>
          <div className="space-y-4">
            <button onClick={() => handleLogin('admin@lms.com', 'admin')} className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition">
              Login as Admin
            </button>
            <button onClick={() => handleLogin('john@lms.com', 'inst')} className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition">
              Login as Instructor
            </button>
            <button onClick={() => handleLogin('jane@lms.com', 'stud')} className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition">
              Login as Student
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  if (currentUser.role === 'admin') {
    return (
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <button onClick={() => setCurrentUser(null)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
        </nav>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Management */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <Users className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-bold">User Management</h2>
            </div>
            <div className="space-y-2 mb-4">
              {users.map(u => (
                <div key={u.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span>{u.name} ({u.role})</span>
                  <button onClick={() => deleteUser(u.id)} className="text-red-500 text-sm">Delete</button>
                </div>
              ))}
            </div>
            <button onClick={() => addUser('New User', 'new@lms.com', 'student')} className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600">
              Add User
            </button>
          </div>

          {/* Course Management */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <BookOpen className="w-6 h-6 text-green-600 mr-2" />
              <h2 className="text-xl font-bold">Course Management</h2>
            </div>
            <div className="space-y-2 mb-4">
              {courses.map(c => (
                <div key={c.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span>{c.title}</span>
                  <button onClick={() => deleteCourse(c.id)} className="text-red-500 text-sm">Delete</button>
                </div>
              ))}
            </div>
            <button onClick={() => addCourse('New Course', 'Course description')} className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600">
              Add Course
            </button>
          </div>

          {/* Performance Analytics */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <BarChart className="w-6 h-6 text-purple-600 mr-2" />
              <h2 className="text-xl font-bold">Performance Analytics</h2>
            </div>
            <div className="space-y-2">
              <p className="text-gray-700">Total Users: {users.length}</p>
              <p className="text-gray-700">Total Courses: {courses.length}</p>
              <p className="text-gray-700">Total Enrollments: {courses.reduce((sum, c) => sum + c.enrolled.length, 0)}</p>
            </div>
          </div>

          {/* System Settings */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <Settings className="w-6 h-6 text-gray-600 mr-2" />
              <h2 className="text-xl font-bold">System Settings</h2>
            </div>
            <div className="space-y-2">
              <button className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">Configure Email</button>
              <button className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">Backup Data</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Instructor Dashboard
  if (currentUser.role === 'instructor') {
    const myCourses = courses.filter(c => c.instructor === currentUser.id);
    return (
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Instructor Dashboard</h1>
          <button onClick={() => setCurrentUser(null)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
        </nav>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* My Courses */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <BookOpen className="w-6 h-6 text-green-600 mr-2" />
              <h2 className="text-xl font-bold">My Courses</h2>
            </div>
            <div className="space-y-2 mb-4">
              {myCourses.map(c => (
                <div key={c.id} className="p-3 bg-gray-50 rounded">
                  <h3 className="font-semibold">{c.title}</h3>
                  <p className="text-sm text-gray-600">{c.description}</p>
                  <p className="text-sm text-blue-600 mt-1">Enrolled: {c.enrolled.length}</p>
                </div>
              ))}
            </div>
            <button onClick={() => addCourse('New Course', 'Description')} className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600">
              Create Course
            </button>
          </div>

          {/* Assignment Grading */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <Award className="w-6 h-6 text-yellow-600 mr-2" />
              <h2 className="text-xl font-bold">Assignment Grading</h2>
            </div>
            <div className="space-y-2">
              {assignments.map(a => (
                <div key={a.id} className="p-3 bg-gray-50 rounded">
                  <h3 className="font-semibold">{a.title}</h3>
                  {a.submissions.map(s => (
                    <div key={s.studentId} className="mt-2 text-sm">
                      <p>Student ID: {s.studentId}</p>
                      <p>Grade: {s.grade || 'Not graded'}</p>
                      <button onClick={() => gradeAssignment(a.id, s.studentId, 90, 'Excellent!')} className="text-blue-500 text-xs mt-1">
                        Update Grade
                      </button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Student Performance */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-6 h-6 text-purple-600 mr-2" />
              <h2 className="text-xl font-bold">Student Performance</h2>
            </div>
            <div className="space-y-2">
              {myCourses.map(c => (
                <div key={c.id} className="p-2 bg-gray-50 rounded">
                  <p className="font-semibold">{c.title}</p>
                  <p className="text-sm text-gray-600">Students: {c.enrolled.length}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Student Dashboard
  if (currentUser.role === 'student') {
    const enrolledCourses = courses.filter(c => c.enrolled.includes(currentUser.id));
    const availableCourses = courses.filter(c => !c.enrolled.includes(currentUser.id));
    return (
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Student Dashboard</h1>
          <button onClick={() => setCurrentUser(null)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
        </nav>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Enrolled Courses */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <BookOpen className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-bold">My Courses</h2>
            </div>
            <div className="space-y-2">
              {enrolledCourses.length === 0 ? (
                <p className="text-gray-500">No enrolled courses yet</p>
              ) : (
                enrolledCourses.map(c => (
                  <div key={c.id} className="p-3 bg-gray-50 rounded">
                    <h3 className="font-semibold">{c.title}</h3>
                    <p className="text-sm text-gray-600">{c.description}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Available Courses */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <FileText className="w-6 h-6 text-green-600 mr-2" />
              <h2 className="text-xl font-bold">Enroll in Courses</h2>
            </div>
            <div className="space-y-2">
              {availableCourses.map(c => (
                <div key={c.id} className="p-3 bg-gray-50 rounded">
                  <h3 className="font-semibold">{c.title}</h3>
                  <p className="text-sm text-gray-600">{c.description}</p>
                  <button onClick={() => enrollCourse(c.id)} className="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
                    Enroll
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Assignments & Grades */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <Award className="w-6 h-6 text-yellow-600 mr-2" />
              <h2 className="text-xl font-bold">My Grades</h2>
            </div>
            <div className="space-y-2">
              {assignments.map(a => {
                const submission = a.submissions.find(s => s.studentId === currentUser.id);
                return submission ? (
                  <div key={a.id} className="p-3 bg-gray-50 rounded">
                    <h3 className="font-semibold">{a.title}</h3>
                    <p className="text-sm text-gray-600">Grade: {submission.grade}</p>
                    <p className="text-sm text-gray-600">Feedback: {submission.feedback}</p>
                  </div>
                ) : null;
              })}
            </div>
          </div>

          {/* Progress Tracking */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-6 h-6 text-purple-600 mr-2" />
              <h2 className="text-xl font-bold">Progress</h2>
            </div>
            <div className="space-y-2">
              <p className="text-gray-700">Enrolled Courses: {enrolledCourses.length}</p>
              <p className="text-gray-700">Completed Assignments: {assignments.filter(a => a.submissions.find(s => s.studentId === currentUser.id)).length}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default LMS;