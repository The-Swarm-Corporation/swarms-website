---
name: blog-banner-minimal
description: Make a swarms.ai blog banner in the minimal Apple-style design, a near-black vertical gradient with one soft red glow, a small red eyebrow label, a large white two-line headline with a gray trailing phrase, one gray sentence, and a command in the corner, rendered at 1920x1080 with headless Chrome. Use this whenever a blog post, announcement or release note in this repo needs a cover image, hero image, OG image or "banner", whenever someone asks for a banner "like the AdvancedResearch one" or "the black and red one", and whenever a new .mdx post is being written without an `image:` field yet. Also use it to regenerate or fix an existing banner from this series.
---

# Minimal blog banner (black gradient, red accent, white type)

This is the banner series introduced with the AdvancedResearch post
(`public/advanced_research_anthropic_multi_agent_banner.png`). The look is
deliberately restrained: one headline, lots of dark space, a single red
accent. It works because of what is left out, so the main job when using
this skill is writing short copy and resisting the urge to add things.

Do not use Playwright for rendering or checking banners; the project owner
has a security objection to it. The bundled script uses headless Chrome,
which is already installed on the team machines.

## Workflow

1. Write the copy (rules below). Draft it in a scratch note first; the copy
   is the whole design.
2. Render with the bundled script. From the repo root:

   ```bash
   python3 .claude/skills/blog-banner-minimal/scripts/make_banner.py \
     --eyebrow "AdvancedResearch" \
     --title "Anthropic's multi-agent<br>research system." \
     --title-muted "Open source." \
     --sub "The orchestrator-worker pattern from the paper, running on the Swarms API and Exa." \
     --footer "pip install advanced-research" \
     --out public/<snake_case_slug>_banner.png
   ```

   The script holds every colour, size and position; only pass copy through
   the flags. If a title needs a third line, shorten the title instead.
3. Look at the PNG (the Read tool shows images). Check: the title is at most
   two lines, nothing is clipped on the right, the subtitle does not leave a
   one-word orphan line, and the gray phrase is still readable.
4. Set `image: "/<snake_case_slug>_banner.png"` in the post's frontmatter,
   in both `content/blog/<slug>.mdx` and `content/blog/zh/<slug>.mdx`. One
   banner serves both languages; the banner text stays in English.
5. Confirm the post renders on the dev server and the image returns 200.

Name the file `<snake_case_slug>_banner.png`. The `_banner` suffix matters:
Next's image optimizer and browsers cache aggressively, so a regenerated
banner under an old filename often keeps showing the stale version. When
you re-render an existing banner and the change does not show up, rename
the file and update the `image:` fields rather than fighting the cache.

## Copy rules

The composition has five text slots. Fill them like this:

| Slot | Flag | What goes there | Length |
|---|---|---|---|
| Eyebrow | `--eyebrow` | The product, repo, API or series name, in red | 1 to 3 words |
| Title | `--title` | The one idea of the post, as a statement ending in a period | 2 lines, about 20 to 28 characters per line at 104px |
| Muted tail | `--title-muted` | A two-word payoff in gray that completes the title | 1 to 3 words plus a period |
| Subtitle | `--sub` | One plain sentence saying what the reader gets | 90 to 130 characters |
| Footer | `--footer` | Something runnable: an install line, a cURL, an endpoint | one line, no prose |

Guidance that makes the difference between this series and a generic dark
banner:

- Title and tail form one sentence pair, white then gray, both ending in a
  period: "Anthropic's multi-agent research system. Open source." The gray
  phrase is the quiet second beat, so keep it short and concrete.
- Put the manual `<br>` where a person would pause, not at the exact width.
  A balanced two-line title beats a full first line with a short second.
- No exclamation marks, no questions, no "Introducing", no colons in the
  title, no version numbers unless the post is a release note.
- The subtitle states the mechanism or the outcome in words a reader
  outside the company understands. It is not a second headline.
- The footer is the only place for monospace-feeling content, and it is
  rendered in the same sans font on purpose. Keep it to one command.
- English only on the banner, even for the Chinese mirror post.
- No em dashes anywhere, matching the blog prose rule.

For longer titles pass `--title-size 92`. Below 88px the headline stops
reading as a headline, so cut words before going smaller.

## Design spec (for reference, already encoded in the script)

Read `references/design-spec.md` if you need to adapt the design, for
example for a square social crop or a different accent, or to explain the
choices to a designer. It lists the exact gradient stops, type scale,
spacing and the one colour of red (`#ee0712`, the site's brand red).

## Things that go wrong

- **Text wraps to three lines or clips on the right.** Shorten the title or
  move the `<br>`, then `--title-size 92` as a last resort.
- **The subtitle orphans one word.** Rephrase so it fits one or two full
  lines; the box is 1340px wide, about 130 characters at 32px.
- **Banner looks unchanged after re-rendering.** Cache. Rename the file
  (`_banner` → `_banner_v2` or a new slug) and update both posts.
- **Fonts look wrong.** The template uses the system SF Pro font on macOS
  with Inter from Google Fonts as fallback. Rendering on Linux without
  network falls back to the default sans and widens the text, so check
  the two-line rule again there.
- **Blog cards crop the image.** The site crops the same file to 4:3, 4:5
  and 2.2:1 (see `docs/BLOG_IMAGE_GUIDELINES.md`). The copy sits in the
  left two thirds and vertical centre, which survives the wide and 4:3
  crops; the tall 4:5 mobile crop trims the right edge, which only holds
  the red glow. Keep it that way: do not add elements on the right side.
