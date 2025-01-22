import { useEffect, useState } from "react";
import { fetchDogs } from "./utils/helpers";
import { Box } from "@mui/material";
import LoginPage from "./components/LoginPage";
import DogsPage from "./components/DogsPage";

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [initialDogIds, setInitialDogIds] = useState([]);

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const resp = await fetchDogs();
      if (resp.status === 200) {
        setLoggedIn(true);
        const data = await resp.json();
        setInitialDogIds(data.resultIds);
      }
    };
    checkIfLoggedIn();
  }, []);

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      {loggedIn ? <DogsPage initialDogIds={initialDogIds} /> : <LoginPage />}
    </Box>
  );
}

export default App;
