import * as logger from "firebase-functions/logger";
import * as functionsV1 from "firebase-functions/v1";
import {initializeApp} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";
import {Storage} from "@google-cloud/storage";
import {onCall} from "firebase-functions/v2/https";
initializeApp();
const firestore = getFirestore("yt-clone-cfa09");
const storage = new Storage();
const rawVideoBucketName = "v-fragile-yt-raw-videos";

export const createUser = functionsV1
  .region("asia-southeast1")
  .auth.user()
  .onCreate(async (user) => {
    const userInfo = {
      uid: user.uid,
      email: user.email,
      photoUrl: user.photoURL,
    };

    try {
      await firestore.collection("users").doc(user.uid).set(userInfo);
      logger.info(`User Created: ${JSON.stringify(userInfo)}`);
    } catch (err) {
      logger.error("Error writing user to Firestore", err);
    }
  });
export const generateUploadUrl = onCall(
  {maxInstances: 1, region: "asia-southeast1"},
  async (request) => {
    if (!request.auth) {
      throw new functionsV1.https.HttpsError(
        "failed-precondition",
        "The function must be called while authenticated"
      );
    }
    const auth = request.auth;
    const data = request.data;
    const bucket = storage.bucket(rawVideoBucketName);

    const fileName = `${auth.uid}-${Date.now()}.${data.fileExtension}`;

    const [url] = await bucket.file(fileName).getSignedUrl({
      version: "v4",
      action: "write",
      expires: Date.now() + 15 * 60 * 1000,
    });
    return {url, fileName};
  }
);
