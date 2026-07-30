# Karla Karolynne Design System

The visual foundation is based on the lavender field and deep-plum lettering of the official logo, with the soft grey tones present in Karla's portrait. It is intentionally isolated with the `kk-` prefix so existing sections can migrate one at a time.

## Tokens

Tokens are defined in `src/styles/design-system.css` as CSS custom properties. Use semantic tokens in components whenever possible:

- Colors: `--kk-color-brand`, `--kk-color-surface`, `--kk-color-text`, `--kk-color-border`.
- Typography: `--kk-font-display` for editorial headings and `--kk-font-body` for UI/body copy.
- Layout: `--kk-space-*`, `--kk-radius-*`, `--kk-container`.
- Elevation: `--kk-shadow-xs` through `--kk-shadow-lg` and `--kk-shadow-glow`.

The matching `kk-*` Tailwind colors and fonts are also exposed through `@theme`, for example `bg-kk-lilac-100` and `font-kk-display`.

## Base components

Import components from `src/components/ui`:

```tsx
import { Button, Card, Container, Section, SectionHeader } from './components/ui'
```

- `Section` provides scoped design-system styles and vertical rhythm.
- `Container` provides the standard content width.
- `SectionHeader` supplies eyebrow, title and description hierarchy.
- `Card` supports `default`, `elevated`, `soft` and `dark` variants.
- `Button` and `ButtonLink` support `primary`, `secondary` and `ghost` variants plus sizing.
- `Input` and `Textarea` provide the base form-control appearance.

Example:

```tsx
<Section spacing="spacious">
  <Container>
    <SectionHeader eyebrow="Método" title="Treino com intenção" description="Uma descrição curta." />
    <Card variant="elevated" padding="large" className="mt-8">
      <Button>Agendar avaliação</Button>
    </Card>
  </Container>
</Section>
```

All interactive elements include keyboard-visible focus treatment and reduced-motion handling. The existing landing, Hero and chat deliberately do not import these components yet.
