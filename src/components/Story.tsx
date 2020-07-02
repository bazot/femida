import React from "react";
import { useParams } from "react-router";
import gql from "graphql-tag";
import { useQuery, useMutation } from "react-apollo";
import PageLayout from "./PageLayout";
import MyStoryLabel from "./MyStoryLabel";
import { Link } from "react-router-dom";

interface IStoryData {
  story: {
    id: string;
    text: string;
    title: string;
    created_at: string;
    user?: {
      id: string;
    };
  };
  my_votes: Array<{ count: number }>;
  story_votes: Array<{
    good: number;
    bad: number;
  }>;
}
interface IStoryVaribles {
  id: string;
}
const QUERY_STORY = gql`
  query Story($id: uuid!) {
    story: stories_by_pk(id: $id) {
      id
      title
      text
      user {
        id
      }
    }
    my_votes: user_votes_count(where: { story_id: { _eq: $id } }) {
      count
      user {
        id
      }
      story {
        id
        text
      }
    }
    story_votes(where: { story_id: { _eq: $id } }) {
      bad
      good
    }
  }
`;

interface IVoteData {
  insert_votes: {
    returning: {
      answer_is_good: boolean;
    };
  };
}
interface IVoteVaribles {
  story_id: string;
  answer_is_good: boolean;
}
const MUTATION_VOTE = gql`
  mutation Vote($story_id: uuid!, $answer_is_good: Boolean!) {
    insert_votes(
      objects: { answer_is_good: $answer_is_good, story_id: $story_id }
    ) {
      returning {
        answer_is_good
      }
    }
  }
`;

export interface IStoryProps {}

const Story = (props: IStoryProps) => {
  const route = useParams<{ id: string }>();
  const storyId = route.id;
  const { data: storyData, loading, error } = useQuery<
    IStoryData,
    IStoryVaribles
  >(QUERY_STORY, {
    variables: {
      id: storyId
    },
    fetchPolicy: "cache-and-network"
  });

  const [
    vote,
    { data: voteData, loading: voteLoading, error: voteError }
  ] = useMutation<IVoteData, IVoteVaribles>(MUTATION_VOTE, {
    refetchQueries: ["Story"]
  });

  return (
    <PageLayout>
      {loading && <div>Loading...</div>}
      {error && <pre>Error: {JSON.stringify(error, null, 2)}</pre>}
      {storyData && storyData.story && (
        <>
          <div>{storyData.story.title}</div>
          <div>{storyData.story.text}</div>
          {storyData.story.user && <MyStoryLabel />}
          {storyData.story_votes.length > 0 && (
            <div>
              Good: {storyData.story_votes[0].good}, Bad:{" "}
              {storyData.story_votes[0].bad}
            </div>
          )}
          {storyData.my_votes.length === 0 && !storyData.story.user && (
            <div>
              <button
                onClick={() =>
                  vote({
                    variables: {
                      answer_is_good: true,
                      story_id: storyData.story.id
                    }
                  })
                }
                disabled={voteLoading}
              >
                Good
              </button>
              <button
                onClick={() =>
                  vote({
                    variables: {
                      answer_is_good: false,
                      story_id: storyData.story.id
                    }
                  })
                }
                disabled={voteLoading}
              >
                Bad
              </button>
            </div>
          )}
        </>
      )}
      <hr />
      <Link to="/app">Tell the story</Link>
    </PageLayout>
  );
};

export default Story;
