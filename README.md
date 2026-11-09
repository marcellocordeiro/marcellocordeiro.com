# marcellocordeiro.com

My website :)

## TODO

- Fix separators, preferably avoiding the \<Separator /> component.
  - A bunch of lists are pretty messy right now, using `divide` or manually including separators. Study how to keep separators in the middle with even spacing.
- Expressive Code integration
  - Ran into bugs when changing the configuration, the server would not emit the css until I cleared the `.astro` file and restarted the server
- Should I make sure the dates are presented in the user's timezone?
- [GitHub alerts](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts), aka callouts or admonitions
- Mermaid diagrams
- Math expressions
- Use `light-dark()` for dark mode support and drop the media query listener?

## Known issues

- Tables won't shrink, causing text to shrink instead
- External link icons will break once the text line wraps
