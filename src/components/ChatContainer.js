//Libraries
import React, { useState } from "react";
import styled from "styled-components";
// Components
import Typography from "@material-ui/core/Typography";
import Messages from "./Messages";
import ChatInput from "./ChatInput";
import PersonIcon from "@material-ui/icons/Person";
import { Modal } from "@material-ui/core";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

export default function ChatContainer(props) {
  const [open, setOpen] = useState(false);

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  return (
    <Container>
      <AuthModal open={open} onClose={closeModal}>
        <ModalContainer>
          <LoginForm />
          <SignupForm />
        </ModalContainer>
      </AuthModal>
      <Header>
        <Typography
          variant="h3"
          align="left"
          gutterBottom
          style={{ color: "#09d3ac", flexGrow: 1 }}
        >
          Chat Room
        </Typography>
        <PersonIcon
          onClick={openModal}
          style={{
            height: 48,
            width: 48,
            cursor: "pointer",
          }}
        />
      </Header>

      <ChatRoom>
        <Messages />
      </ChatRoom>
      <ChatInput />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
`;

const ChatRoom = styled.div`
  height: 600px;
  width: 600px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  /* border: 1px solid #229378; */
  background-color: #202329;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  padding: 40px 0;
  width: 500px;
  background-color: #3d4148;
  color: white;
  outline: none;
  border-radius: 5px;
`;

const AuthModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
