// Libraries
import React, { useState } from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
// Components
import { Typography, TextField, Button } from '@material-ui/core';

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
        id
        username
      }
    }
  }
`;

export default function LoginForm(props) {
  // State
  const [state, setState] = useState({ email: '', password: '' });
  // Mutation
  const [login, { error, loading }] = useMutation(LOGIN, {
    onCompleted(data) {
      console.log('zzz data', data);
      if (data.login) {
        localStorage.setItem('token', data.login.token);
        setState({
          email: '',
          password: ''
        });
      }
    }
  });

  if (error) {
    console.log('zzz error', error);
  }

  function onLogin() {
    const { email, password } = state;
    login({ variables: { email, password } });
  }

  function onChangeText(e) {
    e.persist();
    if (e.target.id === 'email-login') {
      setState(prevState => ({
        ...prevState,
        email: e.target.value
      }));
    } else if (e.target.id === 'password-login') {
      setState(prevState => ({
        ...prevState,
        password: e.target.value
      }));
    }
  }

  return (
    <Form>
      <Typography variant="h6" align="left">
        Login Form
      </Typography>
      <StyledTextField
        value={state.email}
        onChange={onChangeText}
        label="Email"
        id="email-login"
      />
      <StyledTextField
        value={state.password}
        onChange={onChangeText}
        type="password"
        label="Password"
        id="password-login"
      />
      <StyledButton type="button" onClick={onLogin} variant="contained">
        Login
      </StyledButton>
      {loading && <p>loading...</p>}
    </Form>
  );
}

const Form = styled.form`
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
