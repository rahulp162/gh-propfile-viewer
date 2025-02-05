import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store.ts";

const Repos = () => {
    const { repos, loading } = useSelector((state: RootState) => state.slice);
    return (
        <div className="w-full">
            {repos.length > 0 ? (
            <ul className="grid grid-cols-1 gap-4">
                {repos.map((repo: {
                    id: number;
                    name: string;
                    description: string;
                    html_url: string;
                }) => (
                <li key={repo.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{repo.name}</h3>
                    <p className="text-gray-600 mb-4 h-auto overflow-hidden">{repo.description || "No description available"}</p>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                        <Button variant="contained" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">View Repo</Button>
                    </a>
                </li>

                ))}
            </ul>
            ) : (
            !loading && <div className="text-center text-gray-500 text-lg">No Data Available</div>
            )}
        </div>
    )
}

export default Repos;