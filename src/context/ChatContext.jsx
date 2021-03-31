//* Creating our Chat Context with a custom hook that lets us access the state in any component

import { fb } from "../service";
import { deleteChat, getMessages, leaveChat, newChat } from "react-chat-engine";
import { createContext, useState, useEffect, useContext } from "react";
//* We also create a Provider -which means anything we wrap inside this Provider will have access to its context

export const ChatContext = createContext();


//* It takes 2 props- children (passes automatically) & authUser
export const ChatProvider = ({ children, authUser }) => {
  const [myChats, setMyChats] = useState();
  const [chatConfig, setChatConfig] = useState(); // Passes the credentials
  const [selectedChat, setSelectedChat] = useState(); // When User selects a chat from chat list

  //* To create new chat we use createChat() from React Chat Engine
  const createChatClick = () => {
    newChat(chatConfig, { title: "" });
  };

  //* Delete the Chat if its admin then Delete the Chat otherwise leave the chat
  const deleteChatClick = (chat) => {
    const isAdmin = chat.admin.username === chatConfig.userName;
    if (
      isAdmin &&
      window.confirm("Are you sure you want to delete this chat?")
    ) {
      deleteChat(chatConfig, chat.id);
    } else if (window.confirm("Are you sure you want to leave this chat?")) {
      leaveChat(chatConfig, chat.id, chatConfig.userName);
    }
  };

  //* When Use selects the chat from chat list
  const selectChatClick = (chat) => {
    //*Initially we have a list of chat or chat objects which does not contain all messages for the chat
    //*So we actually have to call getMessages() from a given chat
    getMessages(chatConfig, chat.id, (messages) => {
      setSelectedChat({ ...chat, messages }); //Pass the chat messages in the state
    });
  };

  //* Setting the chatConfig state once the user is initialized
  useEffect(() => {
    if (authUser) {
      fb.firestore
        .collection("chatUsers")
        .doc(authUser.uid)
        .onSnapshot((snap) => {
          setChatConfig({
            userSecret: authUser.uid,
            avatar: snap.data().avatar,
            userName: snap.data().userName,
            projectID: "c6ce7237-dc1c-4f2e-ae57-1b2fcafea70e", //? FROM CHATENGINE DASHBOARD
          });
        });
    }
  }, [authUser]);

  //*Since it is a React Component so it will return JSX
  return (
    <ChatContext.Provider
      value={{
        myChats,
        setMyChats,
        chatConfig,
        setChatConfig,
        selectedChat,
        setSelectedChat,
        createChatClick,
        deleteChatClick,
        selectChatClick,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

//* Creating a custom hook which will give access to any piece of state without having to import
//* useContext and other stuff
export const useChat = () => {
  const {
    myChats,
    setMyChats,
    chatConfig,
    setChatConfig,
    selectedChat,
    setSelectedChat,
    createChatClick,
    deleteChatClick,
    selectChatClick,
  } = useContext(ChatContext);

  //* Return as a single object
  return {
    myChats,
    setMyChats,
    chatConfig,
    setChatConfig,
    selectedChat,
    setSelectedChat,
    createChatClick,
    deleteChatClick,
    selectChatClick,
  };
};
