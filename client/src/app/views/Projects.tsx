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

                <div className="w-1/2 flex justify-end">
                    <form>
                        <input
                            className="border rounded-full py-2 px-4"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white rounded-full py-2 px-4 ml-2"
                            type="submit"
                        >
                            Search
                        </button>
                    </form>
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
