

import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const StudentPassForm = () => {
  const [leaveForm, setLeaveForm] = useState({
    reason: '',
    date: '',
    timeSlot: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLeaveForm({ ...leaveForm, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!leaveForm.reason || !leaveForm.date || !leaveForm.timeSlot) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    const newLeaveApplication = { ...leaveForm };

    axios
      .post('http://localhost:5000/StudentPassForm', newLeaveApplication)
      .then((response) => {
        console.log(response.data);
        setLeaveForm({
          reason: '',
          date: '',
          timeSlot: '',
        });
        setErrorMessage('');
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage('An error occurred. Please try again later.');
      });
  };

  const timeSlots = ['9:10-10:10', '10:10-11:10', '11:10-12:15', '12:15-01:00', '01:00-02:00', '02:00-03:00', '03:00-04:00'];

  return (
    <div className="container">
      <h1>Student Pass Form</h1>
      {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Reason for Leave:</label>
          <textarea
            name="reason"
            className="form-control"
            value={leaveForm.reason}
            onChange={handleInputChange}
            required
            rows="4"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date:</label>
          <input
            type="date"
            name="date"
            className="form-control"
            value={leaveForm.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Time Slot:</label>
          <select
            name="timeSlot"
            className="form-select"
            value={leaveForm.timeSlot}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a time slot</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit Leave Application
        </button>
      </form>
    </div>
  );
};

export default StudentPassForm;
