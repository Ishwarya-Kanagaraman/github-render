// Import necessary modules and components from React, React Router, Axios, React Diff Viewer, and Bootstrap
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactDiffViewer from 'react-diff-viewer';
import "../App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  // Import Bootstrap JavaScript

// Define the CommitPage component
const CommitPage = () => {
  // Extract URL parameters using useParams hook
  const { owner, repository, commitSHA } = useParams();
  // Initialize state variables for commit data and diff data
  const [commitData, setCommitData] = useState(null);
  const [diffData, setDiffData] = useState(null);

  // Fetch commit data when component mounts or URL parameters change
  useEffect(() => {
    fetchCommitData();
  }, [owner, repository, commitSHA]);

  // Function to fetch commit data from the backend API
  async function fetchCommitData() {
    const res = await axios.get(`http://localhost:5000/repositories/${owner}/${repository}/commit/${commitSHA}`);
    console.log(res, "response"); // Log the response for debugging
    // Update state with fetched data
    setCommitData(res.data.commit);
    setDiffData(res.data.diff);
  }

  // Function to render the diff data using React Diff Viewer
  const renderDiff = (diff) => {
    let bindData = diff.filter((file) => file.oldContent || file.newContent)
    return bindData.map((file, index) => (
      <div className="accordion-item" key={index}>
        <div
          className={`accordion-title ${index === 0 ? '' : 'collapsed'} cursor-pointer`}
          data-bs-toggle="collapse"
          data-bs-target={`#${index}`}
          aria-expanded="false"
          aria-controls={index}
        >
          {file.filename}
        </div>
        <div id={index} className={`accordion-collapse collapse  ${index === 0 ? 'show' : ''} `}>
          <div className="accordion-content">
            <ReactDiffViewer
              oldValue={file.oldContent}
              newValue={file.newContent}
              splitView={false} // Display the diff in unified view
            />
          </div>
        </div>
      </div>
    )

    );
  };

  // Display a loading message if data is not yet fetched
  if (!commitData || !diffData) return <div>Loading...</div>;

  // Render the commit page
  return (
    <div className="commit-container">
      <div className="commit-header">
        {/* Author's avatar */}
        <img src="path/to/avatar.jpg" alt="Author's Avatar" className="avatar" />
        <div className="commit-info">
          <h2>{commitData.message}</h2> {/* Commit message */}
          <p className="author">
            Authored by <span className="author-name">{commitData.commit.author.name}</span> four days ago
          </p>
          <p className="commit-body">
            This is body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget ipsum massa egestas id pellentesque volutpat maecenas amet.
          </p>
          <div className="commit-meta">
            <p>Committed by <span className="committer-name">{commitData.commit.author.name}</span> three days ago</p>
            <p>Commit <span className="commit-sha">{commitSHA}</span></p>
            <p>Parent <span className="parent-sha">ab003b92b05f0f517a5125a2bc78cda806329017</span></p>
          </div>
        </div>
      </div>
      <div className="commit-diff">
        {renderDiff(diffData)} {/* Render the diff data */}
      </div>
    </div>
  );
};

export default CommitPage;
