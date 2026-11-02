## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)


## Tailwind CSS Development Rules

### Version

- This project uses Tailwind CSS 4.3.3.
- All generated Tailwind CSS code MUST follow the official v4 documentation.
- Do not assume Tailwind CSS v3 syntax or conventions are valid recommendations.

### Source of Truth

Use the official Tailwind CSS documentation as the source of truth:

- Documentation: https://tailwindcss.com/docs
- Upgrade Guide: https://tailwindcss.com/docs/upgrade-guide
- Utility Classes: https://tailwindcss.com/docs/styling-with-utility-classes
- Functions and Directives: https://tailwindcss.com/docs/functions-and-directives

Do not maintain or rely on manually enumerated lists of deprecated,
non-canonical, or discouraged utility classes.

### Implementation Rules

1. Prefer documented Tailwind CSS v4 utilities and syntax.
2. Prefer canonical utility classes over compatibility aliases.
3. Do not use v3 patterns when a v4-native solution exists.
4. Do not invent utility classes or assume a class is valid.
5. For unfamiliar utilities, variants, directives, or arbitrary values,
   consult the official documentation before implementation.
6. Use CSS variables and the v4 @theme system when appropriate.
7. Avoid unnecessary custom CSS and @apply.

### Validation

Before completing a task:

1. Check generated code with Tailwind CSS IntelliSense.
2. Resolve suggestCanonicalClasses warnings.
3. Resolve invalid utility and variant warnings.
4. Run the project's build command.
5. Do not claim a class is canonical merely because it compiles.
6. Never assume an arbitrary value is unavoidable. For every `[v6. Never assume an arbitrary value is unavoidable. Before keeping any `[...]`
   utility, test it for a canonical equivalent. Three checks apply:

   a) Is it already a theme token?
      Colors (`text-[#ef4444]` -> `text-red-500`), font sizes, tracking, radii.

   b) Does it land on the dynamic scale?
      Tailwind CSS v4 uses a dynamic `--spacing` multiplier (`0.25rem`), so ANY
      number is a valid spacing class. A px value is non-canonical whenever it
      maps to an integer (or quarter-step) multiplier:

      ```text
      n = px / 16 / 0.25
      canonical  <=>  n, n*2, or n*4 is an integer
      ```

      Examples: `max-w-[1400px]` -> `max-w-350` (350 x 0.25rem = 87.5rem),
      `min-h-[420px]` -> `min-h-105`.

   c) Is it a `[type:value]` type hint?
      A CSS data type hint almost always belongs in the utility prefix instead:
      `bg-[size:100%_4px]` -> `bg-size-[100%_4px]`,
      `bg-[position:center]` -> `bg-position-[center]`,
      `bg-[linear-gradient(...)]` -> `bg-linear-[...]`.
      Valid v4 prefixes include `bg-size-`, `bg-position-`, `bg-linear-`,
      `bg-radial-`, and `bg-clip-`. Prefixes such as `bg-image-`,
      `bg-repeat-`, `bg-blend-`, `bg-origin-`, and `bg-attachment-` are NOT
      valid, so those must keep the `bg-[...]` form - verify by compiling.

   Keep the bracket form only when all three checks fail: percentages
   (`max-w-[90%]`), viewport units (`min-h-[85vh]`), or zero-offset custom
   shadows like `shadow-[0_0_15px_var(--color-emerald-500)]/15` (pair the
   arbitrary geometry with a token color and a v4 alpha modifier rather than
   a literal `rgba()`).

   These warnings are invisible to the build because every arbitrary form is
 a passing build proves nothing here.


