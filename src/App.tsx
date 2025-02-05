import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { getRepos, getUserData, getUserName } from './features/slice.ts';
import { AppDispatch } from './store.ts';
import {Button} from "@mui/material"
import { RootState } from './features/slice.ts';
// import Repos from './components/Repos';

import Overview from './components/Overview.tsx';
import { TextField } from '@mui/material';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { userName, userData, loading, error } = useSelector((state: RootState) => state.slice);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(getUserName(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName) {
      dispatch(getUserData(userName));
      dispatch(getRepos(userName));
    }
  };

  return (
    <div>
      <div style={{
        height:userData.id?"35vh":"100vh",
        transition:"all 0.5s ease"
      }} className='px-2 py-2 flex flex-col items-center justify-center'>
        
        <div className='text-2xl py-6 '>GitHub Profile Viewer</div>

        
        <form onSubmit={handleSubmit} className='flex flex-row w-80 justify-evenly items-center mb-4'>
          <TextField
            variant='filled'
            label='Username'
            className='w-48'
            type="text"
            placeholder="Enter GitHub Username"
            value={userName}
            onChange={handleInput}
          />
          <Button loading={loading} type="submit">Get Insights</Button>
        </form>

      </div>
      
      {(userData.id || userData.message) && <Overview/>}
  
      {error && <div className='absolute'>Error: {error}</div>}

    </div>
  );
}

export default App;
