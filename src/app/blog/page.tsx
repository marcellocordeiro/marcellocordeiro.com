import Image from "next/image";

import { Link } from "@/components/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getBlogPosts } from "@/lib/blog";

export default function Page() {
  const items = getBlogPosts().map((post) => (
    <Link key={post.slug} href={`/blog/${post.slug}`}>
      <Card className="mx-auto w-full max-w-sm">
        <Image
          className="aspect-video w-full object-cover"
          src={post.image}
          alt={post.title}
        />
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
          <CardDescription>{post.description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  ));

  return <div className="grid auto-rows-min gap-4 md:grid-cols-3">{items}</div>;
}
