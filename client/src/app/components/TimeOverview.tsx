import React from "react";


interface props {
    onClose: () => void;
}

export default function TimeOverview({ onClose }: props) {







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
                        <tr>
                            <td className="border px-4 py-2">1</td>
                            <td className="border px-4 py-2">0 Hours</td>
                            <td className="border px-4 py-2">Dato</td>
                            <td className="border px-4 py-2">Køkken arbejde</td>
                            <td className="border px-4 py-2">Ja</td>
                            </tr>
                    
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