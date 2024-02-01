import React, {useState} from 'react';


interface EntryFormProps {
    onClose: () => void;
}



export default function RegTimeForm({ onClose }: EntryFormProps) {


    const [Time, setAmountTime] = useState('');
    const [ProjectNumber, setProjectNumber] = useState('');


    return (
        <div className='entryForm-overlay'>
            <div className="entryForm-content">
                <div className='field-container'>
                    <label htmlFor="ProjectNumber">Project Number</label>
                    <input
                        type="text"
                        placeholder="Text"
                        className="input-field"
                        value={ProjectNumber}
                        onChange={(e) => setProjectNumber(e.target.value)}
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
                        onChange={(e) => setAmountTime(e.target.value)}
                        id="Time"
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
                        onClick={onClose}>
                        Register
                    </button>

                </div>
            </div>
        </div>
    );
}
