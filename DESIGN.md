# OpenMAIC Teach design context

## Product-screen intent

Learner screens prioritize understanding, explanatory visuals, and practice.
They are not marketing heroes or generic dashboards. A learner should find the
current question, the evidence, the visual relationship, and the next supported
action without ornamental distraction.

## Established shared conventions

No shared design-token file is asserted here: the inspected M02 prototype uses
the repository's existing Tailwind utility workflow and inherits application
typography. Reuse existing component conventions before introducing a new
token, component family, or visual system.

## M02 prototype choices

These are local, intentional choices for `/m02-prototype`, not a global design
system:

- Restrained light surface: `bg-[#f4f6f3]` page background, `bg-[#fbfcfa]`
  evidence panels, slate text, and teal reserved for current state, model
  boundaries, and keyboard focus.
- Compact product hierarchy: a small metadata bar, a persistent progress rail
  on wide screens, and patient evidence before the instructional question.
- Fixed readable type steps rather than fluid display typography. Body copy uses
  generous leading; instructional prose is constrained with `max-w-*` widths.
- Quantitative bars use dark modeled portions and pale assumed portions. Long
  labels sit adjacent to, rather than inside, the geometry so the scale remains
  truthful at narrow widths.
- Explanations use full bordered, lightly tinted surfaces or simple ruled
  sections. Avoid oversized headings, repeated exposition, decorative motion,
  and colored side-stripe callouts.
- Native radios remain visible as learner controls through their labeled
  surfaces, with `focus-within` outline treatment and standard checked-state
  feedback.

## Responsive and accessibility baseline

At narrow widths, content stacks and labels wrap below quantitative bars;
horizontal scrolling must not be required to understand the model. Focus must
be visible on the learner-facing control. Use native semantics first, preserve
logical reading order, and reveal text alternatives with their related visual
information.

## References

- [Product context](PRODUCT.md)
- [M02 approved physiology packet](docs/clinical-content/modules/adult-icu-rt-foundations/M02-physiology-depth-review-packet.md)
- [M02 prototype component](components/prototypes/m02-learning-experience-prototype.tsx)
- [RT Foundations visual and learner guidance](docs/rt-foundations/AUTHORING_STANDARD.md)

This file records current choices. It does not establish clinical approval,
brand policy, or requirements for other tracks.
