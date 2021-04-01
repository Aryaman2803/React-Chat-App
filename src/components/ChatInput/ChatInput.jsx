import { useState } from "react";
import { sendMessage } from "react-chat-engine";
import { Icon } from "semantic-ui-react";
import { useChat } from "../../context";

export const ChatInput = () => {
  const { chatConfig, selectedChat } = useChat();
  const [chatInputText, setChatInputText] = useState("");

  //* Function to call when we are sending a message
  const sendChatMessage = () => {
    if (selectedChat && chatInputText) {
      setChatInputText("");
      sendMessage(chatConfig, selectedChat.id, {
        text: chatInputText,
        files: [],
      });
    }
  };

  return (
    <div className="chat-controls">
      <div
        className="attachment-icons"
        onClick={() => console.log("Add Attachment to click")}
      >
        <Icon name="attach" color="grey" />
      </div>
      <input
        value={chatInputText}
        className="chat-input"
        placeholder="Send a message"
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            sendChatMessage();
          }
        }}
        onChange={(e) => setChatInputText(e.target.value)}
      />
      <div className="send-message-icon" onClick={sendChatMessage}>
        <Icon name="send" color="grey" />
      </div>
    </div>
  );
};
