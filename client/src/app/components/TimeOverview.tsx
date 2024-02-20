import React, { useState, useEffect } from "react";


interface TimeRegistration {
    registeredTime: number;
    note: string;
    date: string;
    id: string;
}


interface TableProps {
    onClose: () => void;
    projectId: number;
}

export default function TimeOverview({ onClose, projectId }: TableProps) {
    const [timeRegistrations, setTimeRegistrations] = useState<TimeRegistration[]>([]);
    const [checkedState, setCheckedState] = useState<{ [key: string]: boolean }>(() => {
        const saved = localStorage.getItem('checkboxState');
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        const fetchTimeRegistrations = async () => {
            if (!projectId) return;
            try {
                const response = await fetch(`http://localhost:3001/api/projects/${projectId}/timeregistrations`);
                if (response.ok) {
                    const data: TimeRegistration[] = await response.json();
                    setTimeRegistrations(data);

                } else {
                    console.error('Failed to fetch time registrations');
                    console.log(projectId);
                }
            } catch (error) {
                console.error('Error fetching time registrations:', error);
            }
        };
        fetchTimeRegistrations();
    }, [projectId]);

    const handleCheckboxChange = (id: string) => {
        const updatedCheckedState = {
            ...checkedState,
            [id]: !checkedState[id],
        };
        setCheckedState(updatedCheckedState);
        localStorage.setItem('checkboxState', JSON.stringify(updatedCheckedState));
    };

    return (
        <div className="entryForm-overlay">
            <div className="entryForm-content">
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <table className="table-fixed w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border px-4 py-2 w-12">#</th>
                            <th className="border px-4 py-2 w-28">Time</th>
                            <th className="border px-4 py-2 w-32">Date</th>
                            <th className="border px-4 py-2">Text</th>
                            <th className="border px-4 py-2 w-20">Invoice</th>
                        </tr>
                    </thead>
                    <tbody>
                        {timeRegistrations.map((registrations, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">{registrations.registeredTime} Hours</td>
                                <td className="border px-4 py-2">{registrations.date}</td>
                                <td className="border px-4 py-2">{registrations.note}</td>
                                <td className="border px-4 py-2">
                                    <input
                                        type="checkbox"
                                        checked={!!checkedState[registrations.id]} // Use the registration.id to check the state
                                        onChange={() => handleCheckboxChange(registrations.id)} // Pass registration.id to the handler
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="buttons-field">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={onClose}>Close</button>
                </div>
            </div>
            </div>
        </div>

    )






}