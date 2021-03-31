import { useEffect, useState } from "react";
import { useChat } from "../../context";
import { Image } from "semantic-ui-react";
import { notMe } from "../../helpers";
import { fb } from "../../service";
export const ChatAvatar = ({ chat, username, className }) => {
  const { chatConfig } = useChat();
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    fb.firestore
      .collection("chatUsers")
      .where("userName", "==", username)
      .get()
      .then((snap) => {
        const data = snap.docs[0]?.data();
        if (data?.avatar) {
          setAvatar(data.avatar);
        }
      });
  }, [chatConfig, username, chat]);
  return (
    <>
      {avatar ? (
        <Image className={className || "chat-list-avatar"} src={avatar} />
      ) : (
        <div className={className || "empty-avatar"}>
          {notMe(chatConfig, chat)[0].toUpperCase()}
        </div>
      )}
    </>
  );
};
