import { useEffect, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { Image, Modal } from "semantic-ui-react";

export const ImageUpload = ({
  file, //* We literally pass a file to this component
  close,
  onsubmit,
  crop = false,
  header = "Send This Image?",
}) => {
  const [imageSrc, setImageSrc] = useState("");
  const cropRef = useRef();

  //USe the File Reader API to read the file and set the source

  useEffect(() => {
    const fr = new FileReader();
    fr.onload = () => setImageSrc(fr.result);
    fr.readAsDataURL(file);
  }, [file]);

  return (
    <Modal dimmer="blurring" open={true}>
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content image>
        {crop ? (
          <AvatarEditor
            ref={cropRef}
            width={200}
            height={200}
            border={50}
            image={imageSrc}
          />
        ) : (
          <Image size="medium" src={imageSrc} alt="preview" />
        )}
      </Modal.Content>
      <Modal.Actions className="image-upload-actions">
        <button className="cancel" onClick={close}>
          Cancel
        </button>
        <button
          className="submit"
          onClick={() => {
            if (crop && cropRef) {
              const canvas = cropRef.current
                .getImageScaledToCanvas()
                .toDataURL();
              fetch(canvas)
                .then((res) => res.blob())
                .then((blob) => onsubmit(blob));
            } else {
              onsubmit();
            }
          }}
        >
          Submit
        </button>
      </Modal.Actions>
    </Modal>
  );
};
