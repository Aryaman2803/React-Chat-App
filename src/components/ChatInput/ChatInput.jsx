import { useState, useRef } from "react";
import { sendMessage } from "react-chat-engine";
import { Icon } from "semantic-ui-react";
import { useChat } from "../../context";
import { ImageUpload } from "../ImageUpload";

export const ChatInput = () => {
  const { chatConfig, selectedChat } = useChat();
  const [chatInputText, setChatInputText] = useState("");
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const inputRef = useRef(null);
  const [image, setImage] = useState();

  //* It is a function for ImageUpload Component which will be passed down
  const onFileAttach = (file) => {
    setImage(file);
    setImageModalOpen(true);
  };
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
    <>
      <div className="chat-controls">
        <div
          className="attachment-icons"
          onClick={() => {
            const input = inputRef.current;
            if (input) {
              input.value = "";
              input.click();
            }
          }}
          className="attachment-icon"
        >
          <Icon name="attach" color="white" />
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
          <Icon name="send" color="white" />
        </div>
      </div>
      <input
        type="file"
        ref={inputRef}
        className="file-input"
        accept="image/jpeg,image/png"
        onChange={(e) => {
          const file = e.target?.files?.[0];
          if (file) {
            onFileAttach(file);
          }
        }}
      />
      {imageModalOpen && !!image && (
        <ImageUpload
          file={image}
          onsubmit={() =>
            sendMessage(
              chatConfig,
              selectedChat.id,
              {
                text: chatInputText,
                files: [image],
              },
              () => {
                setImage(null);
                setChatInputText("");
              }
            )
          }
          close={() => setImageModalOpen(false)}
        />
      )}
    </>
  );
};
