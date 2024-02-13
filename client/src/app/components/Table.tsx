import React, { useState, useEffect } from 'react';
import TimeOverview from './TimeOverview';

interface Project {
    id: number;
    field1: string;
    field2: string;
    field3: string;
    registeredTime: number;
}

interface TableProps {
    dataChanged: boolean; 
}



const Table: React.FC<TableProps> = ({ dataChanged }) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [headerClicked, setHeaderClicked] = useState(false);
    const [timeOverview, setShowHoursView] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
    

    const handleTimeOverviewClick = (ProjectId: number) => {
        setShowHoursView(true);
        setSelectedProjectId(ProjectId);
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/projects');
                if (response.ok) {
                    const data: Project[] = await response.json();
                    console.log(data);
                    setProjects(data);
                } else {
                    console.error('Failed to fetch projects');
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchData();
    }, [dataChanged]);



    const sortProjects = (projectsToSort: Project[]): Project[] => {
        return projectsToSort.sort((a, b) => {
            const dateA = new Date(a.field3);
            const dateB = new Date(b.field3);
            return sortOrder === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
        });
    };

    const renderSortArrow = () => {
        if (!headerClicked) return null;
        return sortOrder === 'asc' ? '↓' : '↑';
    };


    const toggleSortOrder = () => {
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
        setHeaderClicked(true);
    };

    const sortedProjects = sortProjects([...projects]);


    return (
        <>
            <table className="table-fixed w-full">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border px-4 py-2 w-12">#</th>
                        <th className="border px-4 py-2">Project Name</th>
                        <th className="border px-4 py-2">Customer Name</th>
                        <th className="border px-4 py-2">Registered Time</th>
                        <th onClick={toggleSortOrder} style={{ cursor: 'pointer' }}> Deadline {renderSortArrow()}</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedProjects.map((project) => (
                        <tr key={project.id}>
                            <td className="border px-4 py-2">{project.id}</td>
                            <td className="border px-4 py-2">{project.field1}</td>
                            <td className="border px-4 py-2">{project.field2}</td>
                            <td style= {{textDecoration: 'underline', cursor: 'pointer'}} onClick={()=>handleTimeOverviewClick(project.id)} className="border px-4 py-2">{project.registeredTime + " Hours"}</td>
                            <td className="border px-4 py-2">{project.field3}</td>
                        </tr>
                    ))}
                </tbody>
            </table>


            {timeOverview && selectedProjectId!= null && (
                <TimeOverview
                    projectId = {selectedProjectId}
                    onClose={() => setShowHoursView(false)}
                />
            )}
        </>
    );
}

export default Table;
