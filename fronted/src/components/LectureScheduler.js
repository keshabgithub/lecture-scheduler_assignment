import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchCourses } from '../features/courses/courseSlice';
import { fetchInstructors } from '../features/instructors/instructorSlice';
import { fetchLectures } from '../features/lectures/lectureSlice';

const LectureScheduler = () => {
    const dispatch = useDispatch();
    const { data: instructors } = useSelector((state) => state.instructors);
    const { data: courses } = useSelector((state) => state.courses);

    const [formData, setFormData] = useState({
        instructorId: '',
        courseId: '',
        date: '',
        duration: 60
    });

    const [message, setMessage] = useState('');

    useEffect(() => {
        dispatch(fetchInstructors());
        dispatch(fetchCourses());
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'duration' ? Number(value) : value
        });
    };
    


    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
      
        console.log("Form Data Submitted:", formData); // ✅ Add this
      
        try {
          const res = await axios.post('http://localhost:5000/api/lectures', formData);
          dispatch(fetchLectures());
          setMessage('Lecture scheduled successfully!');
          setFormData({ instructorId: '', courseId: '', date: '', duration: 60 });
        } catch (err) {
          console.error('Error:', err); // ✅ Add this too
          setMessage(err.response?.data?.error || 'Something went wrong!');
        }
      };

    return (
        <div>
            <h2>Schedule a New Lecture</h2>
            {message && <p><strong>{message}</strong></p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Instructor:</label><br />
                    <select name="instructorId" value={formData.instructorId} onChange={handleChange} required>
                        <option value="">-- Select Instructor --</option>
                        {instructors.map(inst => (
                            <option key={inst._id} value={inst._id}>{inst.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Course:</label><br />
                    <select name="courseId" value={formData.courseId} onChange={handleChange} required>
                        <option value="">-- Select Course --</option>
                        {courses.map(course => (
                            <option key={course._id} value={course._id}>{course.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Date & Time:</label><br />
                    <input
                        type="datetime-local"
                        name="date"
                       value={formData.date}
                        onChange={handleChange}
                        required
                    />

                </div>
                <div>
                    <label>Duration (minutes):</label><br />
                    <input
                        type="number"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" style={{ marginTop: '10px' }}>Schedule Lecture</button>
            </form>
        </div>
    );
};

export default LectureScheduler;
