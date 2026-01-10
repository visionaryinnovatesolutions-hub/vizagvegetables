
import { createClient } from "@sanity/client";

const sanityClient = createClient({
  projectId: "9gvyd3v1",   // SAME as studio
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,           // fast for public website
});

export default sanityClient;
