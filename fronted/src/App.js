import React, { useState } from 'react';
import InstructorList from './components/InstructorList';
import CourseList from './components/CourseList';
import LectureList from './components/LectureList';
import LectureScheduler from './components/LectureScheduler';
import InstructorLogin from './pages/InstructorLogin';
import AdminLogin from './pages/AdminLogin';
import InstructorRegister from './pages/InstructorRegister'; // 👈 Add this line
import Dashboard from './components/Dashboard';

function App() {
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [selectedLogin, setSelectedLogin] = useState(null);

  const handleLogout = () => {
    localStorage.clear();
    setRole(null);
    setSelectedLogin(null);
  };

  if (!role && !selectedLogin) {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Select Login Type</h2>
        <button onClick={() => setSelectedLogin('admin')}>I'm an Admin</button>
        <button onClick={() => setSelectedLogin('instructor')} style={{ marginLeft: '10px' }}>
          I'm an Instructor
        </button>
        <br /><br />
        <button onClick={() => setSelectedLogin('register')}>Register as Instructor</button>
      </div>
    );
  }


  if (!role && selectedLogin === 'admin') {
    return <AdminLogin onLogin={setRole} />;
  }

  if (!role && selectedLogin === 'instructor') {
    return <InstructorLogin onLogin={setRole} />;
  }

  if (!role && selectedLogin === 'register') {
    return <InstructorRegister onRegistered={() => setSelectedLogin('instructor')} />;
  }


  return (
    <div style={{ padding: '20px' }}>
      <h1>Lecture Scheduling {role === 'admin' ? 'Admin' : 'Instructor'} Panel</h1>
      <button onClick={handleLogout}>Logout</button>

      {role === 'admin' ? (
        <>
          <Dashboard />
          <hr />
          <InstructorList />
          <hr />
          <CourseList />
          <hr />
          <LectureScheduler />
          <hr />
          <LectureList />
        </>
      ) : (
        <LectureList instructorOnly={true} />
      )}
    </div>
  );
}

export default App;
