import React, {useState} from 'react';


interface RegTimeFormProps {
    onClose: () => void;
    onDataChange: () => void; // Optional: if you need to refresh data in parent component
}

export default function RegTimeForm({ onClose, onDataChange }: RegTimeFormProps) {
    const [Time, setAmountTime] = useState(0);
    const [ProjectNumber, setProjectNumber] = useState(0); // Initialize with passed projectId

    const handleRegisterTime = async () => {
        
        // Call the API to update the project's registered time
        // Replace with your actual API endpoint and request structure
        const response = await fetch('http://localhost:3001/api/projects/registerTime', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Id: ProjectNumber, Time: Time }),
        });

        if (response.ok) {
            console.log('Time registered successfully');
            onDataChange(); // Refresh data in parent component if needed
        } else {
            console.error('Failed to register time');
        }

        onClose(); // Close the form
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
                        value={Time}
                        onChange={(e) => setAmountTime(parseInt(e.target.value))}
                        id="registeredTime"
                    />
                </div>

                <div className='buttons-field'>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={onClose}>
                        Close
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleRegisterTime}
                        >
                        Register
                    </button>

                </div>
            </div>
        </div>
    );
}
