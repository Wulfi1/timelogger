import React, { useState } from 'react';
import Table from "../components/Table";
import EntryForm from '../components/EntryForm'; 

export default function Projects() {

    const [showEntryForm, setShowEntryForm] = useState(false);
    const [dataChanged, setDataChanged] = useState(false);

    const handleAddEntryClick = () => {
        setShowEntryForm(true);
    };

    const handleDataChange = () => {
        setDataChanged(prev => !prev); // Toggle this state to trigger data refresh in Table
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
                    onClick={handleAddEntryClick}>
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
                    onDataChange={handleDataChange} // Pass the callback to EntryForm
                />
            )}
            <Table dataChanged={dataChanged} />  {/* Pass the state to Table */}
        </>
    );
}
