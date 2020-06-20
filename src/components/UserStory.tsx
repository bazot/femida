import React from "react";

export interface IStory {
  id: number;
  text: string;
}
export interface IUserStoryProps {
  nextStoryId: number;
  onAddStory: (story: IStory) => void;
}
const UserStory = (props: IUserStoryProps) => {
  const [userStory, setUserStory] = React.useState("");
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    props.onAddStory({
      id: props.nextStoryId,
      text: userStory
    });
    setUserStory("");
  };
  return (
    <div
      id="inputBox"
      style={{
        width: "100%",
        textAlign: "center"
      }}
    >
      <form onSubmit={onSubmit}>
        <input
          value={userStory}
          onChange={e => setUserStory(e.target.value)}
          required
          name="story"
          type="text"
          style={{
            width: "100%",
            height: 200
          }}
        />
      </form>
      <button id="addUserStoryBtn">Judge me!</button>
    </div>
  );
};

export default UserStory;
