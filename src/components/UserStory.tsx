import React, { useCallback } from "react";

import storiesService from "../services/stories";

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
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
        const savedStory = await storiesService.createStory(userStory);
        console.log({ savedStory });
      } catch (error) {
        console.log("Failed ", error);
      }
      setIsSubmitting(false);
      setUserStory("");
    },
    [setIsSubmitting, setUserStory, userStory]
  );
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
          disabled={isSubmitting}
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
        <button type="submit" id="addUserStoryBtn" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Judge me!"}
        </button>
      </form>
    </div>
  );
};

export default UserStory;
