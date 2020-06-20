import React from "react";
import { IStory } from "./UserStory";
import BigButton from "./BigButton";

export interface IStoryPollProps {
  story: IStory;
}
const StoryPoll = ({ story }: IStoryPollProps) => {
  const onGood = () => {
    alert("good");
  };
  const onBad = () => {
    alert("bad");
  };
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "20%",
          textAlign: "center",
          paddingTop: "5%"
        }}
      >
        <p id="storyBoard">{story.text}</p>
      </div>

      <div id="btnBox" style={{ width: "100%", textAlign: "center" }}>
        <table style={{ width: "100%" }}>
          <tbody>
            <tr>
              <td>
                <BigButton variant="good" onClick={onGood}>
                  GOOD
                </BigButton>
              </td>
              <td style={{ width: "20%" }} />
              <td>
                <BigButton variant="bad" onClick={onBad}>
                  BAD
                </BigButton>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default StoryPoll;
