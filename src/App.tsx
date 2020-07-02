import React, { useState, useEffect, useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

import { authCtx } from "./auth/contexts";
import UserStory, { IStory, IUserStoryProps } from "./components/UserStory";
import PageLayout from "./components/PageLayout";
import RecentStories from "./stories/components/MyStories";

function getRandIntinRange(max: number) {
  return Math.floor(Math.random() * max);
}

export default function App() {
  const auth = useContext(authCtx);
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
      <header style={{ marginBottom: 20, textAlign: "right" }}>
        {auth.user ? (
          <>
            <div>
              <i>{auth.user.email}</i>
            </div>
            <Link to="/signout">Sign Out</Link>
          </>
        ) : (
          <Link to="/signin">Sign In</Link>
        )}
      </header>
      <UserStory nextStoryId={stories.length + 1} onAddStory={onAddStory} />
      <RecentStories />
    </PageLayout>
  );
}
