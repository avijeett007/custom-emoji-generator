import { createRouteHandler } from "uploadthing/next-legacy";
import { ourFileRouter } from "@/lib/uploadthing";

const handler = createRouteHandler({
  router: ourFileRouter,
});

export default handler;