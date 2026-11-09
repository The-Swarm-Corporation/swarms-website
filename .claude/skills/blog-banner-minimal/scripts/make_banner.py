#!/usr/bin/env python3
"""Render a swarms.ai blog banner in the minimal black/red/white style.

The banner is an HTML page screenshotted at 1920x1080 by headless Chrome.
Every visual constant lives in this file so the design stays consistent
across posts; change copy through the command-line flags, not the CSS.

Example:
    python3 .claude/skills/blog-banner-minimal/scripts/make_banner.py \
        --eyebrow "AdvancedResearch" \
        --title "Anthropic's multi-agent<br>research system." \
        --title-muted "Open source." \
        --sub "The orchestrator-worker pattern from the paper, running on the Swarms API and Exa." \
        --footer "pip install advanced-research" \
        --out public/advanced_research_anthropic_multi_agent_banner.png
"""
import argparse
import pathlib
import shutil
import subprocess
import sys
import tempfile

CHROME_CANDIDATES = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    shutil.which("google-chrome") or "",
    shutil.which("chromium") or "",
    shutil.which("chromium-browser") or "",
]

RED = "#ee0712"

# The Swarms mark from public/logo.svg with every fill set to white.
LOGO = '''<svg width="54" height="54" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M90 2.5C138.325 2.5 177.5 41.6751 177.5 90C177.5 138.325 138.325 177.5 90 177.5C41.6751 177.5 2.5 138.325 2.5 90C2.5 41.6751 41.6751 2.5 90 2.5Z" stroke="#fff" stroke-width="5"/>
<path d="M78.1054 27.3887L90.0738 48.231L78.1054 69.0734H54.1685L42.2 48.231L54.1685 27.3887L78.1054 27.3887Z" fill="#fff"/>
<path d="M78.1054 111.367L90.0738 132.209L78.1054 153.052H54.1685L42.2 132.209L54.1685 111.367H78.1054Z" fill="#fff"/>
<path d="M54.1664 69.4016L66.1349 90.2439L54.1664 111.086H30.2296L18.2611 90.2439L30.2296 69.4016H54.1664Z" fill="#fff"/>
<path d="M126.168 27.3887L138.137 48.231L126.168 69.0734H102.232L90.2631 48.231L102.232 27.3887L126.168 27.3887Z" fill="#fff"/>
<path d="M126.168 111.367L138.137 132.209L126.168 153.052H102.232L90.2631 132.209L102.232 111.367H126.168Z" fill="#fff"/>
<path d="M102.23 69.4016L114.198 90.2439L102.23 111.086H78.2927L66.3242 90.2439L78.2927 69.4016H102.23Z" fill="#fff"/>
<path d="M150.293 69.4016L162.261 90.2439L150.293 111.086H126.356L114.387 90.2439L126.356 69.4016H150.293Z" fill="#fff"/>
</svg>'''

HTML = '''<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1920px;height:1080px;overflow:hidden}
body{font-family:-apple-system,"SF Pro Display",Inter,system-ui,sans-serif;color:#fff;position:relative;
  background:
    radial-gradient(ellipse 1100px 760px at 78% 112%, rgba(238,7,18,.22) 0%, rgba(238,7,18,0) 65%),
    radial-gradient(ellipse 1400px 900px at 50% -20%, #1a1a1a 0%, rgba(26,26,26,0) 70%),
    linear-gradient(180deg,#0a0a0a 0%,#000 100%)}
.brand{position:absolute;left:120px;top:84px;display:flex;align-items:center;gap:16px;font-weight:600;font-size:30px;letter-spacing:-0.01em;color:#fff}
.copy{position:absolute;left:120px;top:50%;transform:translateY(-50%);width:1500px}
.eyebrow{font-size:26px;font-weight:500;color:@@RED@@;letter-spacing:.01em;margin-bottom:34px}
.title{font-weight:600;font-size:@@TITLE_SIZE@@px;line-height:1.04;letter-spacing:-0.045em;color:#fff}
.title span{color:#6e6e73}
.sub{margin-top:40px;font-size:32px;line-height:1.4;color:#a1a1a6;font-weight:400;width:1340px;letter-spacing:-0.005em}
.foot{position:absolute;left:120px;bottom:84px;font-size:22px;color:#6e6e73;letter-spacing:-0.005em}
.foot b{color:#d2d2d7;font-weight:500}
</style></head><body>
<div class="brand">@@LOGO@@<span>Swarms</span></div>
<div class="copy">
  @@EYEBROW@@
  <div class="title">@@TITLE@@ @@TITLE_MUTED@@</div>
  @@SUB@@
</div>
@@FOOTER@@
</body></html>'''


def find_chrome() -> str:
    for candidate in CHROME_CANDIDATES:
        if candidate and pathlib.Path(candidate).exists():
            return candidate
    sys.exit(
        "No Chrome or Chromium binary found. Install Google Chrome or pass --chrome."
    )


def build_html(args: argparse.Namespace) -> str:
    eyebrow = f'<div class="eyebrow">{args.eyebrow}</div>' if args.eyebrow else ""
    muted = f"<span>{args.title_muted}</span>" if args.title_muted else ""
    sub = f'<div class="sub">{args.sub}</div>' if args.sub else ""
    footer = f'<div class="foot"><b>{args.footer}</b></div>' if args.footer else ""
    return (
        HTML.replace("@@LOGO@@", LOGO)
        .replace("@@RED@@", RED)
        .replace("@@TITLE_SIZE@@", str(args.title_size))
        .replace("@@EYEBROW@@", eyebrow)
        .replace("@@TITLE@@", args.title)
        .replace("@@TITLE_MUTED@@", muted)
        .replace("@@SUB@@", sub)
        .replace("@@FOOTER@@", footer)
    )


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--title", required=True, help="Headline. Use <br> for a manual line break; two lines maximum.")
    parser.add_argument("--title-muted", default="", help="Short trailing phrase rendered in gray after the title, e.g. 'Open source.'")
    parser.add_argument("--eyebrow", default="", help="Small red label above the title: the product, repo or series name.")
    parser.add_argument("--sub", default="", help="One sentence under the title, 90 to 130 characters.")
    parser.add_argument("--footer", default="", help="Bottom-left line, usually an install or cURL command.")
    parser.add_argument("--title-size", type=int, default=104, help="Headline font size in px (default 104; use 92 for longer titles).")
    parser.add_argument("--out", required=True, help="Output PNG path, normally public/<snake_slug>_banner.png.")
    parser.add_argument("--keep-html", action="store_true", help="Write the HTML next to the PNG for inspection.")
    parser.add_argument("--chrome", default="", help="Path to a Chrome/Chromium binary.")
    args = parser.parse_args()

    chrome = args.chrome or find_chrome()
    out = pathlib.Path(args.out).resolve()
    out.parent.mkdir(parents=True, exist_ok=True)
    html = build_html(args)

    workdir = pathlib.Path(tempfile.mkdtemp(prefix="banner-"))
    html_path = workdir / "banner.html"
    html_path.write_text(html)
    if args.keep_html:
        out.with_suffix(".html").write_text(html)

    subprocess.run(
        [
            chrome,
            "--headless=new",
            "--hide-scrollbars",
            "--window-size=1920,1080",
            "--virtual-time-budget=8000",
            f"--screenshot={out}",
            html_path.as_uri(),
        ],
        check=True,
        capture_output=True,
    )
    size_kb = out.stat().st_size // 1024
    print(f"{out} ({size_kb} KB)")
    if size_kb > 500:
        print("warning: over 500 KB, consider simplifying the copy or re-encoding", file=sys.stderr)


if __name__ == "__main__":
    main()
