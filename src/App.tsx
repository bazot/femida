import React, { useState, useEffect, useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

import { currentUserCtx } from "./auth/contexts";
import StoryPoll from "./components/StoryPoll";
import UserStory, { IStory, IUserStoryProps } from "./components/UserStory";
import PageLayout from "./components/PageLayout";

function getRandIntinRange(max: number) {
  return Math.floor(Math.random() * max);
}

export default function App() {
  const currentUser = useContext(currentUserCtx);
  const [stories, setStories] = useState<IStory[]>([]);
  const [currentStory, setCurrentStory] = useState<IStory | null>(
    stories[0] || null
  );
  const onAddStory: IUserStoryProps["onAddStory"] = story => {
    setStories([...stories, story]);
  };
  const onNextStory = useCallback(() => {
    if (stories.length) {
      const nextStoryIndex = getRandIntinRange(stories.length);
      setCurrentStory(stories[nextStoryIndex]);
    }
  }, [stories, setCurrentStory]);

  useEffect(() => {
    if (stories.length && !currentStory) {
      onNextStory();
    }
  }, [stories, currentStory, onNextStory]);

  return (
    <PageLayout>
      {currentStory && <StoryPoll story={currentStory} />}
      {stories.length > 1 && (
        <div style={{ width: "100%", height: 50, textAlign: "right" }}>
          <button onClick={onNextStory}>Next</button>
        </div>
      )}

      <UserStory nextStoryId={stories.length + 1} onAddStory={onAddStory} />
      <br />
      {currentUser ? (
        <>
          <p>
            Signed in as <i>{currentUser.email}</i>
          </p>
          <Link to="/signout">Sign Out</Link>
        </>
      ) : (
        <Link to="/signin">Sign In</Link>
      )}
    </PageLayout>
  );
}
