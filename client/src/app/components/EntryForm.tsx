import React, { useState } from 'react';

interface EntryFormProps {
    onClose: () => void;
    onDataChange: () => void;
}

export default function EntryForm({ onClose, onDataChange }: EntryFormProps) {
    const [projectName, setProjectName] = useState('');
    const [customerName, setCustumorName] = useState('');
    const [date, setDeadLine] = useState('');

    const handleCreate = async () => {
        const projectData = { projectName, customerName, date, registeredTime: 0, isEnded: false };

        try {
            const response = await fetch('http://localhost:3001/api/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectData),
            });
            console.log(projectData);

            if (response.ok) {
                console.log('Project created successfully');
                onDataChange();
                onClose();
            } else {
                console.error('Failed to create project');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="entryForm-overlay">
            <div className="entryForm-content">
                <div className='field-container'>
                    <label htmlFor="field1">Project Name</label>
                    <input
                        type="text"
                        placeholder="Project Name"
                        className="input-field"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        id="projectName"
                    />
                </div>
                <div className='field-container'>
                    <label htmlFor="field2">Customer Name</label>
                    <input
                        type="text"
                        placeholder="Customer Name"
                        className="input-field"
                        value={customerName}
                        onChange={(e) => setCustumorName(e.target.value)}
                        id="customerName"
                    />
                </div>
                <div className='field-container'>
                    <label htmlFor="field3">Deadline</label>
                    <input
                        type="Date"
                        placeholder="Date"
                        className="input-field"
                        value={date}
                        onChange={(e) => setDeadLine(e.target.value)}
                        id="date"
                    />
                </div>

                <div className='buttons-field'>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleCreate}>Create</button>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
}
