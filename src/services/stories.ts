import "@firebase/database";
import { FirebaseDatabase, Reference } from "@firebase/database-types";
import firebaseService, { config } from "./firebase";
import authService from "./auth";

export class StoriesService {
  db: FirebaseDatabase;
  rootRef: Reference;
  storiesRef: Reference;
  constructor() {
    if (!firebaseService.database) {
      throw new Error("FirebaseAuth not imported");
    }
    this.db = firebaseService.database(config.databaseURL);
    this.rootRef = this.db.ref();
    this.storiesRef = this.db.ref("stories");
  }

  createStory = async (text: string) => {
    if (!authService.auth.currentUser) {
      throw new Error("Unauthorized");
    }
    const newStoryRef = this.storiesRef.push();
    try {
      const result = await newStoryRef.set({
        author: authService.auth.currentUser.uid,
        text
      });
      console.log("Created story: ", result);
      return result;
    } catch (error) {
      console.error("Failed to create new story");
      throw error;
    }
  };
}

export default new StoriesService();
