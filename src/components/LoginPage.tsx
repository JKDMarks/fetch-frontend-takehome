import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { fetchFromAPI } from "../utils/helpers";

export default function LoginPage() {
  const [state, setState] = useState({ name: "", email: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resp = await fetchFromAPI("/auth/login", {
      method: "POST",
      body: { name: state.name, email: state.email },
    });
    if (resp.status === 200) {
      window.location.pathname = "/";
    }
  };

  return (
    <Box component="form" id="login-form" onSubmit={handleSubmit}>
      <TextField
        id="name"
        label="Name"
        value={state.name}
        onChange={(e) =>
          setState((state) => ({ ...state, name: e.target.value }))
        }
      ></TextField>
      <TextField
        id="email"
        label="Email"
        value={state.email}
        onChange={(e) =>
          setState((state) => ({ ...state, email: e.target.value }))
        }
      ></TextField>
      <Button type="submit" variant="outlined">
        Login
      </Button>
    </Box>
  );
}
