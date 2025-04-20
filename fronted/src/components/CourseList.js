import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../features/courses/courseSlice';
import axios from 'axios';

const CourseList = () => {
  const dispatch = useDispatch();
  const { data: courses, status } = useSelector((state) => state.courses);

  const [formData, setFormData] = useState({
    name: '',
    level: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/courses', formData);
      dispatch(fetchCourses()); // refresh the list
      setFormData({ name: '', level: '', description: '', image: '' });
    } catch (err) {
      console.error('Error adding course:', err);
    }
  };

  return (
    <div>
      <h2>Courses</h2>
      <ul>
        {courses.map(course => (
          <li key={course._id}>
            <strong>{course.name} ({course.level})</strong><br />
            {course.description}
          </li>
        ))}
      </ul>

      <hr />
      <h3>Add New Course</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Course Name"
          value={formData.name}
          onChange={handleChange}
          required
        /><br />
        <input
          name="level"
          placeholder="Level (e.g. Beginner)"
          value={formData.level}
          onChange={handleChange}
          required
        /><br />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        /><br />
        <input
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        /><br />
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default CourseList;
