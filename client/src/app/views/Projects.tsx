import React, { useState } from 'react';
import Table from "../components/Table";
import EntryForm from '../components/EntryForm';
import RegTimeForm from '../components/RegTimeForm';


export default function Projects() {

    const [showEntryForm, setShowEntryForm] = useState(false);
    const [showTimeForm, setShowTimeForm] = useState(false);
    const [dataChanged, setDataChanged] = useState(false);

    const handleAddEntryClick = () => {
        setShowEntryForm(true);
    };

    const handleTimeClick = () => {
        setShowTimeForm(true);
    };

    const handleDataChange = () => {
        setDataChanged(prev => !prev);
    };


    return (
        <>
            <div className="flex items-center my-6">
                <div className="w-1/2">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={handleAddEntryClick}>
                        Add Project
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleTimeClick}>
                        Register Time
                    </button>
                </div>
            </div>

            {showEntryForm && (
                <EntryForm
                    onClose={() => setShowEntryForm(false)}
                    onDataChange={handleDataChange}
                />
            )}

            {showTimeForm && (
                <RegTimeForm
                    onClose={() => setShowTimeForm(false)}
                    onDataChange={handleDataChange}

                />
            )}
            <Table dataChanged={dataChanged} />
        </>
    );
}
