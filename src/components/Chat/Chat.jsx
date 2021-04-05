import { useEffect } from "react";
import { useChat } from "../../context/ChatContext";
import { getChats, ChatEngine } from "react-chat-engine";
import { LeftRail } from "../LeftRail";
import { ChatToolbar } from "../ChatToolbar";
import { ChatInput } from "../ChatInput/";
import { MessageList } from "../MessageList";
//*We hook the Chat Engine here
export const Chat = () => {
  const {
    myChats,
    setMyChats,
    chatConfig,
    selectedChat,
    selectChatClick,
    setSelectedChat,
  } = useChat();

  useEffect(() => {
    console.log("My Chats: ", myChats);
  }, [myChats]);
  useEffect(() => {
    console.log("Selected Chat: ", selectedChat);
  }, [selectedChat]);
  return (
    <>
      <LeftRail />
      {/* If chatConfig exists then we render the ChatEngine */}
      {!!chatConfig && (
        <ChatEngine
          hideUI={true}
          userName={chatConfig.userName}
          projectID={chatConfig.projectID}
          userSecret={chatConfig.userSecret}
          onConnect={() => {
            //*It is a function which calls automatically whenever their is a successful connection to ChatEngine
            //! This is a Web Socket Connection

            //* getChats() takes the chatConfig and returns a Callback which gives us an Array of Chat.
            //* So we will store the array in our setMyChats state
            getChats(chatConfig, setMyChats);
          }}
          //*Gets chat on Right side
          //* It also renders the new chat without needing to refresh the page
          onNewChat={(chat) => {
            if (chat.admin.username === chatConfig.userName) {
              selectChatClick(chat);
              setMyChats([...myChats, chat].sort((a, b) => a.id - b.id));
            }
          }}
          //* It also renders the new chat without needing to refresh the page
          onDeleteChat={(chat) => {
            if (selectedChat?.id === chat.id) {
              setSelectedChat(null);
            }
            setMyChats(
              //* Show all the left side chats except the one we delete
              myChats
                .filter((c) => c.id !== chat.id)
                .sort((a, b) => a.id - b.id)
            );
          }}
          //* For ChatInput Component
          //*We make sure we are listening specifically for msg on the chat that is opened
          onNewMessage={(chatId, message) => {
            if (selectedChat && chatId === selectedChat.id) {
              //* Adding messages to our list of messages
              setSelectedChat({
                ...selectedChat,
                messages: [...selectedChat.messages, message],
              });
            }
            const chatThatMessageBelongsTo = myChats.find(
              (c) => c.id === chatId
            );
            //*Filter everything except we the chat we got message on
            const filteredChats = myChats.filter((c) => c.id !== chatId);
            const updatedChat = {
              ...chatThatMessageBelongsTo,
              last_message: message,
            };
            setMyChats(
              [updatedChat, ...filteredChats].sort((a, b) => a.id - b.id)
            );
          }}
        />
      )}
      <div className="chat-container">
        <div className="current-chat">
          {selectedChat ? (
            <div className="chat">
              <ChatToolbar />
              <MessageList />
              <ChatInput />
            </div>
          ) : (
            <div className="no-chat-selected">
              <img
                src="https://thumbs.dreamstime.com/b/tablet-users-communicating-speech-bubbles-global-internet-communication-social-media-network-technology-chat-message-121949182.jpg"
                
                alt="point-left"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
