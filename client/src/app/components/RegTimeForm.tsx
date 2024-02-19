import React, { useState, useEffect } from 'react';


interface RegTimeFormProps {
    onClose: () => void;
    onDataChange: () => void;
}

export default function RegTimeForm({ onClose, onDataChange }: RegTimeFormProps) {
    const [Time, setAmountTime] = useState(0);
    const [ProjectNumber, setProjectNumber] = useState(0);
    const [TimeNote, setTimeNote] = useState('');
    const [Date, setDate] = useState('');
    const [canRegisterTime, setCanRegisterTime] = useState(true);

    useEffect(() => {
        const fetchProjectDetails = async () => {
            if (ProjectNumber > 0) {
                try {
                    const response = await fetch(`http://localhost:3001/api/projects/${ProjectNumber}`);
                    if (response.ok) {
                        const project = await response.json();
                        setCanRegisterTime(!project.isEnded);
                    } else {
                        console.error('ProjectNumber doesn\'t exist');
                    }
                } catch (error) {
                    console.error('Error fetching project details:', error);
                }
            }
        };

        fetchProjectDetails();
    }, [ProjectNumber]);


    const handleRegisterTime = async () => {

        if (!canRegisterTime) {
            alert('Cannot register time for a project that has ended.');
            return;
        }

        const response = await fetch('http://localhost:3001/api/projects/registerTime', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Id: ProjectNumber, Time: Time, Note: TimeNote, Date: Date }),
        });

        if (response.ok) {
            console.log('Time registered successfully');
            onDataChange();
        } else {
            console.error('Failed to register time');
        }

        onClose();
    };


    return (
        <div className='entryForm-overlay'>
            <div className="entryForm-content">
                <div className='field-container'>
                    <label htmlFor="ProjectNumber">Project Number</label>
                    <input
                        type="number"
                        placeholder="Project Number"
                        className="input-field"
                        value={ProjectNumber}
                        onChange={(e) => setProjectNumber(parseInt(e.target.value))}
                        id="ProjectNumber"
                    />
                </div>

                <div className='field-container'>
                    <label htmlFor="Time">Amount of Hours</label>
                    <input
                        type="number"
                        placeholder="Hours"
                        className="input-field"
                        step="0.5"
                        value={Time}
                        onChange={(e) => setAmountTime(parseFloat(e.target.value))}
                        id="registeredTime"
                    />
                </div>

                <div className='field-container'>
                    <label htmlFor="Time">Note</label>
                    <input
                        type="text"
                        placeholder="Note"
                        className="input-field"
                        value={TimeNote}
                        onChange={(e) => setTimeNote(e.target.value)}
                        id="TimeNote"
                    />
                </div>

                <div className='field-container'>
                    <label htmlFor="Time">Date</label>
                    <input
                        type="date"
                        placeholder="Date"
                        className="input-field"
                        value={Date}
                        onChange={(e) => setDate(e.target.value)}
                        id="Date"
                    />
                </div>

                <div className='buttons-field'>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleRegisterTime}
                    >
                        Register
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={onClose}>
                        Close
                    </button>


                </div>
            </div>
        </div>
    );
}
