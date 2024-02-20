import React, { useState } from 'react';


interface RegTimeFormProps {
    onClose: () => void;
    onDataChange: () => void;
}

export default function RegTimeForm({ onClose, onDataChange }: RegTimeFormProps) {
    const [Time, setAmountTime] = useState('');
    const [ProjectNumber, setProjectNumber] = useState(0);
    const [TimeNote, setTimeNote] = useState('');
    const [Date, setDate] = useState('');

    const handleRegisterTime = async () => {
        if (ProjectNumber <= 0) {
            alert('Invalid Project Number.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3001/api/projects/${ProjectNumber}`);
            if (!response.ok) {
                alert('Project Number does not exist.');
                return;
            }
    
            const project = await response.json();
            if (project.isEnded) {
                alert('Cannot register time for a project that has ended.');
                return;
            }
    
            const timeResponse = await fetch('http://localhost:3001/api/projects/registerTime', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Id: ProjectNumber, Time: parseFloat(Time), Note: TimeNote, Date: Date }),
            });
    
            if (timeResponse.ok) {
                console.log('Time registered successfully');
                onDataChange();
            } else {
                console.error('Failed to register time');
            }
    
        } catch (error) {
            console.error('Error validating project number or registering time:', error);
        }
    
        onClose();
    };

    const validateInput = (input: string) => /^-?\d+(\.\d+)?$/.test(input);

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmountTime(e.target.value); 
    };

    const handleTimeBlur = () => {
        if (validateInput(Time)) {
            setAmountTime(Time);
        } else {
            setAmountTime('');
        }
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
                        type="text" 
                        placeholder="Hours"
                        className="input-field"
                        value={Time}
                        onChange={handleTimeChange}
                        onBlur={handleTimeBlur} 
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
