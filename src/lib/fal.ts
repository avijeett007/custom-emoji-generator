import * as fal from "@fal-ai/serverless-client";

if (!process.env.FAL_KEY) {
  throw new Error("FAL_KEY environment variable is not set");
}

fal.config({
  credentials: process.env.FAL_KEY,
});

export { fal };