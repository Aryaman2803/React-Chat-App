// import { ChatList } from "react-chat-engine";
import { useChat } from "../../context";
import { useResolved } from "../../hooks";
import { Loader } from "semantic-ui-react";
import { ChatList } from "../ChatList";
export const LeftRail = () => {
  const { myChats, createChatClick } = useChat();
  const chatsResolved = useResolved(myChats);

  return (
    <div className="left-rail">
      {chatsResolved ? (
        <>
          {!!myChats.length ? (
            <div className="chat-list-container"><ChatList/></div>
          ) : (
            <div className="chat-list-container no-chats-yet">
              <h3>No Chats Yet.</h3>
            </div>
          )}
          <button className="create-chat-btn" onClick={createChatClick}>
            Create Chat
          </button>
        </>
      ) : (
        <div className="chats-loading">
          <Loader active size="huge" />
        </div>
      )}
    </div>
  );
};
