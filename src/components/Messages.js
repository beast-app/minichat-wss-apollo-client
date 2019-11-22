import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import Typography from '@material-ui/core/Typography';
import Message from './Message';

// Graphql
const GET_MESSAGES = gql`
  query getMessages {
    messages {
      id
      body
      createdAt
      postedBy {
        id
        email
        username
      }
    }
  }
`;

const MESSAGE_SUBSCRIPTION = gql`
  subscription newMessageSubscription {
    newMessage {
      id
      body
      createdAt
      postedBy {
        id
        email
        username
      }
    }
  }
`;

function subcribeToNewMessages(subscribeToMore) {
  const unsubscribe = subscribeToMore({
    document: MESSAGE_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      console.log('zzz prev', prev);
      if (!subscriptionData.data) return prev;
      const { newMessage } = subscriptionData.data;

      return Object.assign({}, prev, {
        messages: [...prev.messages, newMessage]
      });
    }
  });
  return unsubscribe;
}

export default function Messages() {
  const bottomRef = useRef(null);
  const containerRef = useRef(null);

  // query
  const {
    loading: loadingMessage,
    data: messagesData,
    subscribeToMore
  } = useQuery(GET_MESSAGES);
  // subscription
  // const { data: newMessageData } = useSubscription(MESSAGE_SUBSCRIPTION);

  useEffect(() => {
    const unsubscribeToNewMessages = subcribeToNewMessages(subscribeToMore);
    return () => {
      typeof unsubscribeToNewMessages === `function` &&
        unsubscribeToNewMessages(subscribeToMore);
    };
  }, [subscribeToMore]);

  // scroll to bottom of chat on initial load.
  useEffect(() => {
    if (bottomRef.current && containerRef.current) {
      containerRef.current.scrollTo(0, bottomRef.current.offsetTop);
    }
  }, [bottomRef, containerRef, messagesData]);

  if (loadingMessage)
    return (
      <Typography
        variant="body1"
        align="left"
        gutterBottom
        style={{ color: 'white' }}
      >
        loading...
      </Typography>
    );

  return (
    <Container ref={containerRef}>
      {messagesData.messages.map((message, i) => (
        <Message message={message} />
      ))}

      <ScrollingElement ref={bottomRef} />
    </Container>
  );
}

// Styles
const Container = styled.div`
  height: 100%;
  padding: 10px;
  overflow: scroll;
  box-sizing: border-box;
`;
const ScrollingElement = styled.div`
  float: left;
  clear: both;
  height: 20px;
`;
