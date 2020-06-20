import React from "react";
import { StoriesService } from "../services/stories";

export const storiesServiceCtx = React.createContext<StoriesService | null>(
  null
);

export default storiesServiceCtx;
