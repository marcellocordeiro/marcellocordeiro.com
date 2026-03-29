import { Typography } from "@/components/ui/typography";
import { getBlogPostsTags } from "@/lib/blog";

type Props = PageProps<"/blog/tags/[tag]">;

export default async function Page({ params }: Props) {
  const { tag } = await params;

  return (
    <Typography>
      <p>{`Placeholder ${tag}`}</p>
    </Typography>
  );
}

export function generateStaticParams() {
  return getBlogPostsTags();
}
