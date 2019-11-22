import React, { useState } from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

import { Typography, TextField, Button } from '@material-ui/core';

const SIGN_UP = gql`
  mutation signup($email: String!, $password: String!, $username: String!) {
    signup(email: $email, password: $password, username: $username) {
      token
      user {
        email
        username
      }
    }
  }
`;

export default function SignupForm(props) {
  // State
  const [state, setState] = useState({ email: '', password: '', username: '' });
  // Mutation
  const [signUp, { error, loading }] = useMutation(SIGN_UP, {
    onCompleted(data) {
      console.log('zzz data', data);
      if (data.signup) {
        localStorage.setItem('token', data.signup.token);
      }
    }
  });

  if (error) {
    console.log('zzz error', error);
  }

  function onSignUp() {
    const { email, password, username } = state;
    signUp({ variables: { email, password, username } });
    setState({
      email: '',
      password: '',
      username: ''
    });
  }

  function onChangeText(e) {
    e.persist();
    if (e.target.id === 'email-signup') {
      setState(prevState => ({
        ...prevState,
        email: e.target.value
      }));
    } else if (e.target.id === 'password-signup') {
      setState(prevState => ({
        ...prevState,
        password: e.target.value
      }));
    } else if (e.target.id === 'username-signup') {
      setState(prevState => ({
        ...prevState,
        username: e.target.value
      }));
    }
  }

  return (
    <Form>
      <Typography variant="h6" align="left">
        Signup Form
      </Typography>
      <StyledTextField
        value={state.email}
        onChange={onChangeText}
        label="Email"
        id="email-signup"
      />
      <StyledTextField
        value={state.password}
        onChange={onChangeText}
        label="Password"
        type="password"
        id="password-signup"
      />
      <StyledTextField
        value={state.username}
        onChange={onChangeText}
        label="Username"
        id="username-signup"
      />
      <StyledButton
        type="button"
        onClick={onSignUp}
        disabled={loading}
        variant="contained"
      >
        SIGN UP
      </StyledButton>
      {loading && <p>loading...</p>}
    </Form>
  );
}

const Form = styled.form`
  margin-top: 40px;
  width: 300px;
  display: flex;
  flex-direction: column;
`;

const StyledTextField = styled(TextField)`
  &&& {
    margin-top: 10px;
    input {
      color: white !important;
    }
    label {
      color: white;
    }
    label.Mui-focused,
    label.MuiInputLabel-shrink {
      color: gray;
    }
    .MuiInputBase-root::before {
      border-color: white;
    }
    .MuiInputBase-root::after {
      border-color: #09d3ac;
    }
  }
`;

const StyledButton = styled(Button)`
  &&& {
    background-color: inherit;
    border: 1px solid #09d3ac;
    color: #09d3ac;
    margin-top: 20px;
  }
`;
