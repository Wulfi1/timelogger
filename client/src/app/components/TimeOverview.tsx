import React, { useState, useEffect } from "react";


interface TimeRegistration {
    id: number;
    time: number;
    date: string;
    text: string;
    invoice: boolean;
}


interface props {
    onClose: () => void;
    projectId: number;
}

export default function TimeOverview({ onClose, projectId }: props) {
    const [timeRegistrations, setTimeRegistrations] = useState<TimeRegistration[]>([]);

    useEffect(() => {
        const fetchTimeRegistrations = async () => {
            if (projectId) { // Ensure projectId is not null
                try {
                    const response = await fetch(`http://localhost:3001/api/${projectId}/timeregistrations`);
                    if (response.ok) {
                        const data: TimeRegistration[] = await response.json();
                        setTimeRegistrations(data);
                    } else {
                        console.error('Failed to fetch time registrations');
                    }
                } catch (error) {
                    console.error('Error fetching time registrations:', error);
                }
            }
        };
        fetchTimeRegistrations();
    }, [projectId]);



    return (

        <div className="entryForm-overlay">
            <div className="entryForm-content">
                <table className="table-fixed w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border px-4 py-2 w-12">#</th>
                            <th className="border px-4 py-2 w-24">Time</th>
                            <th className="border px-4 py-2 w-32">Date</th>
                            <th className="border px-4 py-2">Text</th>
                            <th className="border px-4 py-2 w-20">Invoice</th>
                        </tr>
                    </thead>
                    <tbody>
                    {timeRegistrations.map(reg => (
                            <tr key={reg.id}>
                                <td className="border px-4 py-2">{reg.id}</td>
                                <td className="border px-4 py-2">{reg.time} Hours</td>
                                <td className="border px-4 py-2">{reg.date}</td>
                                <td className="border px-4 py-2">{reg.text}</td>
                                <td className="border px-4 py-2">{reg.invoice ? 'Yes' : 'No'}</td>
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

    )





}