import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import React, { useEffect } from 'react';
import { getUserData, getUserName } from './features/slice';
import { AppDispatch } from './store';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { userName, userData, loading, error } = useSelector((state: any) => state.slice);

  useEffect(() => {
    if (userName) {
      dispatch(getUserData(userName));
    }
  }, [userName, dispatch]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(getUserName(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName) {
      dispatch(getUserData(userName));
    }
  };

  return (
    <>
      <h1>GitHub Profile Viewer</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter GitHub Username"
          value={userName}
          onChange={handleInput}
        />
        <button type="submit">Get Insights</button>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}

      <div>
        {userData.length > 0 ? (
          <ul>
            {userData.map((repo: any) => (
              <li key={repo.id}>
                <h3>{repo.name}</h3>
                <p>{repo.description}</p>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  View Repo
                </a>
              </li>
            ))}
          </ul>
        ) : (
          !loading && <div>No Data Available</div>
        )}
      </div>
    </>
  );
}

export default App;
