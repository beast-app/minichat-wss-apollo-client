import React, { useState } from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
// components
import Button from '@material-ui/core/Button';

const CREATE_MESSAGE = gql`
  mutation createMessage($body: String!) {
    createMessage(body: $body) {
      createdAt
      postedBy {
        email
        username
      }
    }
  }
`;

export default function ChatInput() {
  const [message, setMessage] = useState('');

  const [createMessage, { error, loading }] = useMutation(CREATE_MESSAGE, {
    onCompleted(data) {
      setMessage('');
    }
  });

  function onSendMessage(e) {
    e.preventDefault();
    createMessage({ variables: { body: message } });
  }

  return (
    <Container onSubmit={onSendMessage}>
      <Input
        value={message}
        onChange={e => {
          setMessage(e.target.value);
        }}
      />
      <StyledButton type="button" onClick={onSendMessage} variant="contained">
        SEND
      </StyledButton>
    </Container>
  );
}

const Container = styled.form`
  display: flex;
  flex-direction: row;
  height: 50px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  background-color: #181a1f;
`;

const Input = styled.input`
  flex-grow: 1;
  height: 100%;
  background-color: inherit;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border-width: 0px;
  font-size: 20px;
  color: white;
  padding-left: 10px;
  &:hover {
  }

  &:focus {
    outline: none;
  }
`;

const StyledButton = styled(Button)`
  &&& {
    background-color: inherit;
    border: 1px solid #09d3ac;
    color: #09d3ac;
    margin-left: 20px;
  }
`;
