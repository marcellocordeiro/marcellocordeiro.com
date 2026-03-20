import { getBlogPostsTags } from "@/lib/blog";

type Props = PageProps<"/blog/tags/[tag]">;

export default async function Page({ params }: Props) {
  const { tag } = await params;

  return <p>{`Placeholder ${tag}`}</p>;
}

export function generateStaticParams() {
  return getBlogPostsTags();
}
