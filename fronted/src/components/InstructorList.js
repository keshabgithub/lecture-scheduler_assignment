import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInstructors } from '../features/instructors/instructorSlice';

const InstructorList = () => {
  const dispatch = useDispatch();
  const { data: instructors, status } = useSelector((state) => state.instructors);

  useEffect(() => {
    dispatch(fetchInstructors());
  }, [dispatch]);

  return (
    <div>
      <h2>Instructors</h2>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'succeeded' && (
        <ul>
          {instructors.map((inst) => (
            <li key={inst._id}>{inst.name} - {inst.email}</li>
          ))}
        </ul>
      )}
      {status === 'failed' && <p>Failed to load instructors</p>}
    </div>
  );
};

export default InstructorList;
