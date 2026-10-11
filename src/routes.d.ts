type RootRoute = "/";
type BlogRoute = "/blog" | `/blog/${string}`;
type ProjectsRoute = "/projects" | `/projects/${string}`;
type TestRoute = "/test";
type ExternalRoute = `https://${string}`;
type MailtoRoute = `mailto:${string}`;

type Route =
  | RootRoute
  | BlogRoute
  | ProjectsRoute
  | TestRoute
  | ExternalRoute
  | MailtoRoute
  | string;
