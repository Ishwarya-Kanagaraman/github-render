import React, { useEffect, useState } from 'react';
import { useParams, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import CommitPage from './components/CommitPage';

// import { Diff, Hunk, parseDiff } from 'react-diff-view';
// import 'react-diff-view/style/index.css';

const App = () => {
  // const { owner, repository, commitSHA } = useParams();
  // const [commitData, setCommitData] = useState(null);
  // const [diffData, setDiffData] = useState(null);

  // useEffect(() => {
  //   async function fetchCommitData() {
  //     try {
  //       const res = await axios.get(`http://localhost:5000/repositories/${owner}/${repository}/commit/${commitSHA}`);
  //       console.log(res, "response")

  //       setCommitData(res.data.commit);
  //       setDiffData(res.data.diff);
  //     } catch (error) {
  //       console.error('Error fetching commit data:', error);
  //     }
  //   }

  //   fetchCommitData();
  // }, [owner, repository, commitSHA]);

  // if (!commitData || !diffData) return <div>Loading...</div>;

  // const files = parseDiff(diffData);

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/respositories/:owner/:repository/commit/:commitSHA' element={<CommitPage />} />
        </Routes>
      </Router>

    </div>
  );
};

export default App;
