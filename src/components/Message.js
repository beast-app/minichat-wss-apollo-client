import React from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import moment from 'moment';

export default function Message(props) {
  const { message } = props;
  const { body, createdAt, postedBy } = message;
  const { email, username } = postedBy;

  const date = moment(createdAt).format('h:mm:ss a');

  return (
    <div style={{ paddingBottom: 20 }}>
      <MessageContainer>
        <Typography variant="body2" align="left" gutterBottom>
          {username}
        </Typography>
        <Typography
          variant="body2"
          align="left"
          gutterBottom
          style={{ marginLeft: 10 }}
        >
          {date}
        </Typography>
      </MessageContainer>
      <Typography variant="body1">{body}</Typography>
    </div>
  );
}

const MessageContainer = styled.div`
  display: flex;
  flex-direction: row;
  color: white;
`;
