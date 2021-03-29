import { useEffect } from "react";
import { useChat } from "../../context/ChatContext";

export const Chat = () => {
  const {chatConfig} = useChat();

  useEffect(() => {
    console.log(chatConfig);
  }, [chatConfig]);
  return <> I am the Chat</>;
};
