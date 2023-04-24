import { useState, useEffect } from "react";
import reactLogo from "../../assets/react.svg";
import viteLogo from "/vite.svg";
import "./Home.css";

import db from "../../firebase/firebase-config";
import { collection, getDocs } from "@firebase/firestore";

function Home() {
  const [count, setCount] = useState(0);

  // sample fetching of data
  // backenders will provide setter and getter functions that will save data to global state.

  const [testData, setTestData] = useState(undefined);

  const testRef = collection(db, "test");

  useEffect(() => {
    const getTestCollectionData = async () => {
      const res = await getDocs(testRef);

      const data = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      setTestData(data);
    };

    if (!testData) getTestCollectionData();
  }, [testData, testRef]);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <p>{JSON.stringify(testData)}</p>
    </>
  );
}

export default Home;
