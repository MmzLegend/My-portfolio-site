# Portfolio rebuild workflow

The static portfolio's established Mac generator remains active. Its entry point is `work/build_v2.py`, run from the existing working area's parent folder. It first runs `work/build_portfolio.py`, adds established project worlds, then calls `apply_concepts()` from this repository's `tools/portfolio_concepts.py`. Portable project data is in `tools/portfolio_concepts.json`; images are tracked in `images/concepts/`.

The final step regenerates all six independent case studies, listing cards, the recent homepage section, web collection and architectural collection. Luma Galleria belongs to **3D & VR / 3D Architectural Design**, while the other five belong to Web. The legacy enhancement pass excludes their case files to prevent duplicate scripts and dialogs.

## Safe changes and rebuilds

1. Start from the current repository and preserve any manual changes in a recoverable commit.
2. Edit concept copy/categories in `tools/portfolio_concepts.json`; edit their rendering in `tools/portfolio_concepts.py`. Existing disciplines still use the established external generators.
3. Copy generator files, asset metadata and current site into an isolated directory with the same `work/portfolio` layout. Run `python3 work/build_v2.py` there. Do not blindly rebuild over the live checkout.
4. Review the diff. Check local links, filters, galleries, desktop/mobile layouts and source/demo URLs. Repeat the build to detect duplication.
5. Copy approved output to a clean checkout, inspect staged files, commit and push through GitHub Pages main/root. A push can publish the site.

## Verified repair

The repaired ordinary rebuild reproduced every file in the reviewed published snapshot byte-for-byte. Removing all six concept case files from the isolated output and rebuilding recreated them correctly. Repeating the ordinary build preserved the same output and single scripts/dialogs. Eon, Fiffy and all previous content remained identical. Luma retained its 3D classification and actual model render/plan gallery.

## Portability limit

The legacy `build_v2.py`, `build_portfolio.py` and `assets.json` remain in the established external `work/` directory; they were not previously tracked in this repository. A fresh clone alone therefore cannot rebuild the entire historical portfolio. It can serve/edit the complete static site and includes the concept data/renderer. The connected Mac generator loads that tracked renderer directly, so there is no duplicated concept-data source. Migrating the full historical build system into the repository is a separate task.
