import React from "react";

import gql from "graphql-tag";
import { useQuery } from "react-apollo";
import { Link } from "react-router-dom";
import MyStoryLabel from "../../components/MyStoryLabel";

interface IRecentStoriesData {
  stories: Array<{
    id: string;
    text: string;
    title: string;
    created_at: string;
    user?: {
      id: string;
    };
  }>;
}
interface IRecentStoriesVaribles {}
const REACENT_STORIES_QUERY = gql`
  query RecentStories {
    stories(order_by: { created_at: desc }, limit: 10, offset: 0) {
      id
      text
      title
      created_at
      user {
        id
      }
    }
  }
`;

export interface IStory {
  id: string;
  text: string;
  title: string;
  created_at: string;
  user?: {
    id: string;
  };
}

export interface IMyStoriesProps {}

const RecentStories = (props: IMyStoriesProps) => {
  const { data: recentStories, loading, error } = useQuery<
    IRecentStoriesData,
    IRecentStoriesVaribles
  >(REACENT_STORIES_QUERY, {
    fetchPolicy: "cache-and-network"
  });

  return (
    <div>
      <h3>Recent stories</h3>
      {loading && <div>Loading...</div>}
      {error && <pre>Error: {JSON.stringify(error, null, 2)}</pre>}
      <ul>
        {recentStories &&
          recentStories.stories.map((story, i) => (
            <li key={story.id}>
              <StoryCard story={story} />
            </li>
          ))}
      </ul>
    </div>
  );
};

const StoryCard = (props: { story: IStory }) => {
  return (
    <Link className="StoryCard" to={`/stories/${props.story.id}`}>
      <div style={{ width: "100%", marginBottom: 10 }}>{props.story.title}</div>
      <div style={{ width: "100%", marginBottom: 10 }}>{props.story.text}</div>
      {props.story.user && <MyStoryLabel />}
    </Link>
  );
};

export default RecentStories;
