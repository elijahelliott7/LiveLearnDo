# Live Learn Do project notes

Updated October 28, 2026.

## Mission and audience

The user's mission is inspired by Abraham Maslow's human motivation theory: help people understand their needs, then find local resources to meet them. The initial audience is people experiencing homelessness. Geographic scope remains undecided. These are planning decisions, not new public mission copy. Resource listings are outside this update.

## Page structure and learning notes

- `index.html` introduces Live Learn Do with the existing Who We Are and Our Vision wording and a Learn More button. The button is temporarily disabled pending the decision-tree design.
- Updated user direction: Learn More must open a question-based decision tree. The first question, choices, and branches are not yet specified. Do not invent these.
- The user approved the homepage visual preview and explicitly authorized publication on October 28, 2026, including retaining the disabled Learn More button for now.
- `assessment-info.html` preserves the existing self-assessment explanation and instructions separately, with links to `survey.html` and home. It is not the Learn More destination. Its eventual placement is undecided.
- `survey.html` is unchanged, preserving its assessment controls and existing behavior.
- Relative links work both in local previews and GitHub Pages. The shared `styles.css` keeps the pages visually consistent. Introductory page styles are scoped to avoid changing survey controls.
- Real headings, an ordered instruction list, a main landmark, visible keyboard focus, and darker green links improve structure and readability while keeping the existing visual language.

## Existing limitation

The instructions mention personalized results and tailored resources, but the current survey has no submit/results handler or resource directory. Its script only updates the year and expands descriptions. This update preserves the instructions as requested; results/resources need separate implementation before those promises are fulfilled.

## Hosting and review

The existing GitHub Pages setup serves `main` from the repository root with `CNAME` retaining the custom domain. The approved homepage is being submitted directly to `main` for publication, as requested. Squarespace manages the domain and DNS, not these HTML files. The static visual preview is a local review artifact and is excluded from the website commit.

## Validation

Source checks verify unchanged mission paragraphs, unchanged survey and domain configuration, valid local file references, and clean whitespace. Public homepage verification confirmed the new content and disabled button. Mobile inspection at 390 by 844 confirmed readable wrapped text and no horizontal overflow. A stylesheet version query prevents older cached CSS from obscuring the approved styling. The existing responsive logo and container rules remain; new navigation wraps on narrow screens.
