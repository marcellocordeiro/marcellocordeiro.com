import { Link } from "@/components/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getBlogPosts } from "@/lib/blog";

function Time({ date }: { date: Date }) {
  return (
    <time dateTime={date.toISOString()}>
      {date.toLocaleDateString("en-us", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}
    </time>
  );
}

export default function Page() {
  const items = getBlogPosts().map((post) => (
    <Link key={post.slug} href={`/blog/${post.slug}`}>
      <Card className="mx-auto w-full">
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
          <CardDescription>{post.description}</CardDescription>
          <CardDescription>
            <Time date={post.date} />
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  ));

  return <div className="flex flex-col gap-4">{items}</div>;
}
