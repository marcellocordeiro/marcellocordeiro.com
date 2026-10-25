type RootRoute = "/";
type BlogRoute = "/blog" | `/blog/${string}`;
type TagsRoute = "/tags" | `/tags/${string}`;
type ProjectsRoute = "/projects" | `/projects/${string}`;
type TestRoute = "/test";
type RssRoute = "/rss.xml";
type AnchorRoute = `#${string}`;

type ExternalRoute = `http://${string}` | `https://${string}`;
type MailtoRoute = `mailto:${string}`;

type Route =
  | RootRoute
  | BlogRoute
  | TagsRoute
  | ProjectsRoute
  | TestRoute
  | RssRoute
  | AnchorRoute
  | ExternalRoute
  | MailtoRoute;
