
import * as React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";



const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setIsSubmitting(true);

    const reqData = {
      email: data.get('email'),
      password: data.get('password')
    }
    fetch(import.meta.env.VITE_API_BASE_URL+"/api/login", {
      method:"POST",
      body: JSON.stringify(reqData),
      headers: { "Content-Type":"application/json"}
    }).then(async response => {
        // console.log(">>>>> ", response)
        if(!response.ok){
            if(response.status === 400) setError("Missing credentials")
            else if(response.status === 404) setError("Invalid email and/or password")
            else setError("Something went wrong! :<")
        }else{
            const data = await response.json()
            console.log(data.token) //save this token in a global state
            navigate("/")
        }
    }).catch(error => {
        setError(error.message || "Something went wrong! :<")
    }).finally(()=>setIsSubmitting(false))

  }
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4">
          Log in
        </Typography>

        <Box component="form" onSubmit={handleSubmit}  noValidate sx={{ mt:1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt:3, mb:2 }}
          >
            Log in
          </Button>

          <Grid container>
            <Grid item>
              <Link href= "/register"  variant="body2">
                Register
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;