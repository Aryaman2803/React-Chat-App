export const joinUsername = (people, currentUsername) => {
  return (
    "@" +
    people
      .map((p) => p.person.username)
      .filter((us) => us !== currentUsername)
      .join(", @")
  );
};
