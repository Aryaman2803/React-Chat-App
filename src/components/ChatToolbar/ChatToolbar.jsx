import { useChat } from "../../context";
import { useState } from "react";
import { joinUsername } from "../../helpers";
import { Icon } from "semantic-ui-react";
import { SearchUsers } from "../SearchUsers";

export const ChatToolbar = () => {
  const { selectedChat, chatConfig } = useChat();
  const [searching, setSearching] = useState(false);

  return (
    <>
      <div className="chat-toolbar">
        <div className="chat-header-text">
          {joinUsername(selectedChat.people, chatConfig.userName).slice(0, 100)}
        </div>
        <div className="add-user-icon">
          <Icon
            color="white"
            name="user plus"
            onClick={() => setSearching(true)}
          />
        </div>
      </div>

      <SearchUsers visible={searching} closeFn={() => setSearching(false)} />
    </>
  );
};
