import { Link } from "@/components/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Post } from "@/lib/blog";

export interface PostNavigationProps {
  previous?: Post;
  next?: Post;
}

export function PostNavigation({ previous, next }: PostNavigationProps) {
  return (
    <nav className="grid grid-cols-[auto_auto] gap-5">
      {previous && <PreviousPost slug={previous.slug} title={previous.title} />}

      {next && <NextPost slug={next.slug} title={next.title} />}
    </nav>
  );
}

interface NavigationProps {
  slug: string;
  title: string;
}

function NextPost({ slug, title }: NavigationProps) {
  return (
    <Link className="col-start-2" href={`/blog/${slug}`}>
      <Card>
        <CardHeader className="justify-end">
          <CardTitle>{`Next -->`}</CardTitle>
          <CardDescription>{title}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}

function PreviousPost({ slug, title }: NavigationProps) {
  return (
    <Link className="col-start-1" href={`/blog/${slug}`}>
      <Card>
        <CardHeader>
          <CardTitle>{`<-- Previous`}</CardTitle>
          <CardDescription>{title}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
