Title: {{title}}
Description: {{description}}
Test Points: {{keyPoints}}
Question Count: {{questionCount}}, Difficulty: {{difficulty}}, Question Types: {{questionTypes}}
{{#if hasReasoningGate}}
## Authoritative Reasoning Gate

Generate exactly one `short_answer` question using this authoritative authoring constraint:

{{reasoningGate}}

Put the complete post-gate explanation in the question's `analysis`. Do not add other questions, options, an answer key, or a `reasoningGate` field. The host application attaches the canonical gate metadata and validates the final contract before persistence.
{{/if}}
## Language Directive
{{languageDirective}}

Output JSON array directly (no explanation, no code blocks, no LaTeX):
[{"id":"q1","type":"single","question":"Question text","options":["Option A","Option B","Option C","Option D"],"correctAnswer":"Option A"}]
