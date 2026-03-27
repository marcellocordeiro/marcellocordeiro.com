import { Link } from "@/components/link";
import { Typography } from "@/components/ui/typography";
import { getBlogPosts } from "@/lib/blog";

export default function Page() {
  const posts = getBlogPosts();

  return (
    <Typography>
      <h1>Welcome</h1>
      <h2>About Me</h2>
      <ul>
        <li>
          <p>
            I'm Marcello, and I work as a Software Engineer at CESAR. I have a passion for
            technology, programming, gaming and music.
          </p>
        </li>

        <li>
          <p>
            At work, I build native macOS and iOS applications, from writing UI code to developing
            and maintaining shared libraries across teams. I enjoy experimenting and working on new
            solutions to improve both the developer and the user experience.
          </p>
        </li>

        <li>
          <p>
            In my free time I enjoy playing games and working on fun projects. I've written a few
            emulators as challenges to develop new skills and learn new programming languages. I
            have also written this entire website from the scratch as way to brush up my web
            development skills, which still needs a ton of improvements, oops.
          </p>
        </li>
      </ul>
      <h2>Projects</h2>
      <dl>
        <dt>
          Game Boy emulator (
          <Link href="https://github.com/marcellocordeiro/gameboy-emulator">
            /marcellocordeiro/gameboy-emulator
          </Link>
          )
        </dt>
        <dd>
          - Game Boy/Game Boy Color emulator written in Rust. Supports Windows/macOS/Linux but also
          runs in the browser:{" "}
          <Link href="https://gb.marcellocordeiro.com">gb.marcellocordeiro.com</Link>
        </dd>

        <dt>
          NES emulator (
          <Link href="https://github.com/marcellocordeiro/gameboy-emulator">
            /marcellocordeiro/nes-emulator
          </Link>
          )
        </dt>
        <dd>- NES emulator written in C++. Supports Windows/macOS/Linux.</dd>

        <dt>
          This website (
          <Link href="https://github.com/marcellocordeiro/marcellocordeiro.com">
            /marcellocordeiro/marcellocordeiro.com
          </Link>
          )
        </dt>
        <dd>
          - This website. There is also a blog and a RSS feed. It'll be more useful for when there
          are more blog posts! It's fully open source, for your viewing pleasure (or not).
        </dd>
      </dl>
      <h2>Programming Languages And Tools</h2>
      <p>
        I mainly write Swift at work, but I can also comfortably write Rust, C++,
        JavaScript/TypeScript. I'll also play with Python and other languages whenever they fit the
        use case.
      </p>
      <h2>Blog Posts</h2>
      <p>Some of the blog posts I've written recently</p>
      <ul>
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </Typography>
  );
}
