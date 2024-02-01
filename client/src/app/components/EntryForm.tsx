import React, { useState } from 'react';

interface EntryFormProps {
    onClose: () => void;
    onDataChange: () => void;
}

export default function EntryForm({ onClose, onDataChange }: EntryFormProps) {
    // State variables for input fields
    const [field1, setField1] = useState('');
    const [field2, setField2] = useState('');
    const [field3, setField3] = useState('');

    // Function to handle the create action
    const handleCreate = async () => {
        const projectData = {field1, field2, field3 };
    
        try {
            const response = await fetch('http://localhost:3001/api/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectData),
            });
    
            if (response.ok) {
                console.log('Project created successfully');
                onDataChange();
                onClose();
                // Optionally, trigger a refresh of the table or update global state
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
                {/* Field 1 */}
                <div className='field-container'>
                    <label htmlFor="field1">Project Name</label>
                    <input
                        type="text"
                        placeholder="Field 1"
                        className="input-field"
                        value={field1}
                        onChange={(e) => setField1(e.target.value)}
                        id="field1"
                    />
                </div>

                {/* Field 2 */}
                <div className='field-container'>
                    <label htmlFor="field2">Customer Name</label>
                    <input
                        type="text"
                        placeholder="Field 2"
                        className="input-field"
                        value={field2}
                        onChange={(e) => setField2(e.target.value)}
                        id="field2"
                    />
                </div>

                {/* Field 3  */}
                <div className='field-container'>
                    <label htmlFor="field3">Deadline</label>
                    <input
                        type="text"
                        placeholder="Field 3"
                        className="input-field"
                        value={field3}
                        onChange={(e) => setField3(e.target.value)}
                        id="field3"
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
