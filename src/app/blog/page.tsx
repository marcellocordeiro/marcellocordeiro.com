import { Link } from "@/components/link";
import { getBlogPosts } from "@/lib/blog";

export default function Page() {
  const items = getBlogPosts().map((post) => {
    return (
      <div key={post.slug}>
        <Link href={`/blog/${post.slug}`}>{post.slug}</Link>
      </div>
    );
  });

  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div>{items}</div>

        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </>
  );
}
