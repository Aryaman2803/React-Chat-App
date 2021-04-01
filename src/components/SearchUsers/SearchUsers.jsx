import { useChat } from "../../context";
import { Search } from "semantic-ui-react";
import { useEffect, useRef, useState } from "react";
import { addPerson, getOtherPeople } from "react-chat-engine";
import { useDebounce } from "../../hooks";
export const SearchUsers = ({ visible, closeFn }) => {
  let searchRef = useRef();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  // null -> not searching for results
  //[] -> No results
  //[...] -> Results
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    if (visible && searchRef) {
      searchRef.focus(); //* Ref will be an Input Element. In HTML input has focus attribute
    }
  }, [visible]);

  const {
    myChats,
    setMyChats,
    chatConfig,
    selectedChat,
    setSelectedChat,
  } = useChat();

  //* Helper function when user clicks on the user
  const selectUser = (username) => {
    addPerson(chatConfig, selectedChat.id, username, () => {
      //* It will filter out all of the chats where selectedchat is not equal to c.id
      const filteredChats = myChats.filter((c) => c.id !== selectedChat.id);

      const updatedChat = {
        ...selectedChat, //* Takes current selectedChat, spreads it out in the object.
        people: [...selectedChat.people, { person: { username } }], //* And override new people key
      };
      setSelectedChat(updatedChat);
      setMyChats([...filteredChats, updatedChat]);
      closeFn(); //* CLose the Search
    });
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      setLoading(true);
      getOtherPeople(chatConfig, selectedChat.id, (chatId, data) => {
        //* Creating an array from this Object (Array of keys of object), Map through it and just make it an array of username

        //* Basically we are finding all usernames that matches the search term

        const userName = Object.keys(data)
          .map((key) => data[key].username)
          .filter((u) =>
            u.toLowerCase().includes(debouncedSearchTerm.toLocaleLowerCase())
          );
        setSearchResults(userName.map((u) => ({ title: u })));
        setLoading(false);
      });
    } else {
      setSearchResults(null);
    }
  }, [chatConfig, selectedChat, debouncedSearchTerm]);

  return (
    <div
      className="user-search"
      style={{ display: visible ? "block" : "none" }}
    >
      <Search
        fluid
        onBlur={closeFn}
        loading={loading}
        input={{ ref: (r) => (searchRef = r) }}
        value={searchTerm}
        results={searchResults}
        placeholder="Search For Users"
        open={!!searchResults && !loading}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        onResultSelect={(e, data) => {
          if (data.result.title) {
            selectUser(data.result.title);
          }
        }}
      />
    </div>
  );
};
