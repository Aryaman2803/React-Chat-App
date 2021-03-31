import { Icon } from "semantic-ui-react";
import { useChat } from "../../context";
import { notMe, joinUsername } from "../../helpers";
import { ChatAvatar } from "../ChatAvatar";

export const ChatList = () => {
  const {
    myChats,
    chatConfig,
    selectedChat,
    deleteChatClick,
    selectChatClick,
  } = useChat();

  return (
    <div className="chat-list">
      {myChats.map((c, index) => (
        <div
          key={index}
          className={`chat-list-item ${
            selectedChat?.id === c.id ? "selected-chat-item" : ""
          }`}
        >
          <div
            className="chat-list-item-content"
            onClick={() => selectChatClick(c)}
          >
            {c.people.length === 1 ? (
              <>
                <Icon circular inverted color="violet" name="user cancel" />
                <div className="chat-list-preview">
                  <div className="preview-username">No One Added Yet</div>
                </div>
              </>
            ) : c.people.length === 2 ? (
              <>
                <ChatAvatar username={notMe(chatConfig, c)} chat={c} />
                <div className="chat-list-preview">
                  <div className="preview-username">{notMe(chatConfig, c)}</div>
                  <div className="preview-message">
                    {c.last_message.attachments.length
                      ? `${c.last_message.sender.username} sent an attachment`
                      : c.last_message.text.slice(0, 50) + "..."}
                  </div>
                </div>
              </>
            ) : (
              <>
                <Icon circular inverted color="brown" name="users" />
                <div className="preview-username">
                  {joinUsername(c.people, chatConfig.userName).slice(0, 50) +
                    "..."}
                </div>
                <div className="preview-message">
                  {c.last_message.attachments.length
                    ? `${c.last_message.sender.username} sent an attachment`
                    : c.last_message.text.slice(0, 50) + "..."}
                </div>
              </>
            )}
          </div>
          <div className="chat-item-delete" onClick={() => deleteChatClick(c)}>
            <Icon name="delete" />
          </div>
        </div>
      ))}
    </div>
  );
};
