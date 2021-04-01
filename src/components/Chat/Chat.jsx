import { useEffect } from "react";
import { useChat } from "../../context/ChatContext";
import { getChats, ChatEngine } from "react-chat-engine";
import { LeftRail } from "../LeftRail";
import { ChatToolbar } from "../ChatToolbar";
//*We hook the Chat Engine here
export const Chat = () => {
  const { myChats, setMyChats, chatConfig, selectedChat } = useChat();

  useEffect(() => {
    console.log("My Chats: ", myChats);
  }, [myChats]);
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
        />
      )}
      <div className="chat-container">
        <div className="current-chat">
          {selectedChat ? (
            <div className="chat">
              <ChatToolbar />
            </div>
          ) : (
            <div className="no-chat-selected">
              <img
                src="/img/pointLeft.png"
                className="point-left"
                alt="point-left"
              />
              Select A Chat.
            </div>
          )}
        </div>
      </div>
    </>
  );
};
