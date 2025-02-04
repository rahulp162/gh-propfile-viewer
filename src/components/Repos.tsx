import { Button } from "@mui/material";
import { useSelector } from "react-redux";

const Repos = () => {
    const { repos, loading } = useSelector((state: any) => state.slice);
    return (
        <div>
            {repos.length > 0 ? (
            <ul>
                {repos.map((repo: any) => (
                <li key={repo.id}>
                    <h3>{repo.name}</h3>
                    <p>{repo.description}</p>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                        <Button>View Repo</Button>
                    </a>
                </li>
                ))}
            </ul>
            ) : (
            !loading && <div>No Data Available</div>
            )}
      </div>
    )
}

export default Repos;