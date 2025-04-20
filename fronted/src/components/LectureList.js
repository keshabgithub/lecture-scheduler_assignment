// frontend/src/components/LectureList.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLectures } from '../features/lectures/lectureSlice';
import axios from 'axios';

const LectureList = ({ instructorOnly = false }) => {
  const dispatch = useDispatch();
  const { data: lectures, status } = useSelector((state) => state.lectures);
  const instructorId = localStorage.getItem('instructorId');

  useEffect(() => {
    dispatch(fetchLectures());
  }, [dispatch]);

  const toggleAttendance = async (lectureId, currentStatus) => {
    const newStatus = currentStatus === 'Attended' ? 'Not Attended' : 'Attended';
    try {
      await axios.put(`http://localhost:5000/api/lectures/attendance/${lectureId}`, {
        status: newStatus
      });
      dispatch(fetchLectures());
    } catch (err) {
      console.error('Error updating attendance:', err);
    }
  };

  const filteredLectures = instructorOnly
    ? lectures.filter((lecture) => lecture.instructorId?._id === instructorId)
    : lectures;

  return (
    <div>
      <h2>Scheduled Lectures</h2>
      {status === 'loading' && <p>Loading lectures...</p>}
      {status === 'succeeded' && (
        <ul>
          {filteredLectures.map((lecture) => (
            <li key={lecture._id}>
              <strong>Course:</strong> {lecture.courseId?.name} <br />
              <strong>Instructor:</strong> {lecture.instructorId?.name} <br />
              <strong>Date:</strong> {new Date(lecture.date).toLocaleString()} <br />
              <strong>Duration:</strong> {lecture.duration} mins <br />
              <strong>Attendance:</strong> {lecture.attendanceStatus} <br />
              {(!instructorOnly || lecture.instructorId?._id === instructorId) && (
                <button
                  onClick={() => toggleAttendance(lecture._id, lecture.attendanceStatus)}
                  style={{ marginTop: '5px' }}
                >
                  Mark as {lecture.attendanceStatus === 'Attended' ? 'Not Attended' : 'Attended'}
                </button>
              )}
              <hr />
            </li>
          ))}
        </ul>
      )}
      {status === 'failed' && <p>Failed to load lectures</p>}
    </div>
  );
};

export default LectureList;
