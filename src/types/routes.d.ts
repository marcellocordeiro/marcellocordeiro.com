type RootRoute = "/";
type BlogRoute = "/blog" | `/blog/${string}`;
type TagsRoute = "/tags" | `/tags/${string}`;
type ProjectsRoute = "/projects" | `/projects/${string}`;
type RssRoute = "/rss.xml";
type AnchorRoute = `#${string}`;

type ExternalRoute = `http://${string}` | `https://${string}`;
type MailtoRoute = `mailto:${string}`;

type Route =
  | RootRoute
  | BlogRoute
  | TagsRoute
  | ProjectsRoute
  | TestRoutes
  | RssRoute
  | AnchorRoute
  | ExternalRoute
  | MailtoRoute;

type TestRoutes = `/tests/${string}`;
