# Photo cards

**Date:** 2026-11-10
**Status:** Implemented and checked in the browser (phone and desktop)

On a phone, the church-family photos were nearly square and almost a screen tall, and the social row wrapped into large blocks. The skip link is removed.

## Decisions

| Topic | Choice |
| --- | --- |
| Photo shape | 4:3 photos, two across on a phone and four on a wide screen. Corners are only slightly rounded, with no drop shadow. |
| Faces | `object-position: center 4%` so a portrait crop keeps the people. |
| Leadership | A light bordered panel. The photo sits inside it with a small corner radius. |
| Social row | One line of smaller icons and names. |
| Skip link | Removed from every page. |

## Review

- Home, Visit, About, and Mission at 390px and at desktop.
- Photos read as cards, not full-screen squares.
- Social names stay on one line.
- No sideways scrolling.
