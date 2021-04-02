import { useChat } from "../../context";
import { fb } from "../../service";
import { useResolved } from "../../hooks";
import { ImageUpload } from "../ImageUpload";
import { Icon, IconGroup, Image, Loader } from "semantic-ui-react";
import { useState, useRef } from "react";
//* Function to store the avatar in Firebase
export const RailHeader = () => {
  const { chatConfig } = useChat();
  const configResolved = useResolved(chatConfig);
  const inputRef = useRef(null);
  const [image, setImage] = useState();

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <>
      <input
        type="file"
        ref={inputRef}
        className="file-input"
        accept="image/jpeg,image/png"
        onChange={(e) => {
          const file = e.target?.files?.[0]; //* If there is a file
          if (file) {
            setImage(file);
          }
        }}
      />
      {!!image && (
        <ImageUpload
          crop
          file={image}
          header="Set Your Avatar"
          close={() => setImage(null)}
          //* Now we access the firebase
          onsubmit={(croppedImage) => {
            const storageRef = fb.storage.ref();
            const uploadRef = storageRef.child(
              `${chatConfig.userSecret}_avatar.jpg`
            );

            //*After uploading we need to get the donwwload URL so that we can put in in firebase document
            uploadRef.put(croppedImage).then(() => {
              uploadRef.getDownloadURL().then((url) => {
                fb.firestore
                  .collection("chatUsers")
                  .doc(chatConfig.userSecret)
                  .update({ avatar: url })
                  .then(() => setImage(null));
              });
            });
          }}
        />
      )}
      <div className="left-rail-header">
        <Icon
          name="sign out"
          className="sign-out"
          onClick={() => fb.auth.signOut()}
        />
        {configResolved && chatConfig ? (
          <div className="current-user-info">
            <IconGroup
              onClick={() => {
                const input = inputRef.current;
                if (input) {
                  input.value = "";
                  input.click();
                }
              }}
              size="large"
              className="user-avatar"
            >
              {chatConfig.avatar ? (
                <Image src={chatConfig.avatar} avatar />
              ) : (
                <div className="empty-avatar">
                  {chatConfig.userName[0].toUpperCase()}
                </div>
              )}
              <Icon corner name="camera" inverted circular />
            </IconGroup>
            <div className="current-username">
              {capitalizeFirstLetter(chatConfig.userName)}
            </div>
          </div>
        ) : (
          <div className="user-loading">
            <Loader active size="small" />
          </div>
        )}
      </div>
    </>
  );
};
