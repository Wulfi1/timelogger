import React, { useState, useEffect } from 'react';

// Define the structure of a project
interface Project {
    id: number;
    field1: string;
    field2: string;
    field3: string;
}

// If you're passing any props to Table, define them here. 
// For example, if you're passing a 'dataChanged' prop, include it in this interface.
// If no props are being passed, you can remove this interface.
interface TableProps {
    dataChanged?: boolean;  // This prop is optional
}

const Table: React.FC<TableProps> = ({ dataChanged }) => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/projects');
                if (response.ok) {
                    const data: Project[] = await response.json();
                    setProjects(data);
                } else {
                    console.error('Failed to fetch projects');
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchData();
    }, [dataChanged]);  // Depend on dataChanged prop to re-fetch data

    return (
        <table className="table-fixed w-full">
            <thead className="bg-gray-200">
                <tr>
                    <th className="border px-4 py-2 w-12">#</th>
                    <th className="border px-4 py-2">Project Name</th>
                    <th className="border px-4 py-2">Customer Name</th>
                    <th className="border px-4 py-2">Registered Time</th>
                    <th className="border px-4 py-2">Deadline</th>
                </tr>
            </thead>
            <tbody>
                {projects.map((project, index) => (
                    <tr key={project.id}>
                        <td className="border px-4 py-2">{index + 1}</td>
                        <td className="border px-4 py-2">{project.field1}</td>
                        <td className="border px-4 py-2">{project.field2}</td>
                        <td className="border px-4 py-2">{0}</td>
                        <td className="border px-4 py-2">{project.field3}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Table;
