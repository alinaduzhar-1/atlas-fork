# Stardust Design System - Application Design Guidelines

## Design Approach

**Design System:** Multiverse Stardust - A comprehensive, component-driven design system

**Core Principles:**
- **Component-First:** Always use Stardust components instead of custom implementations
- **Semantic Tokens:** Convey meaning through purpose-driven design tokens
- **Consistency:** Maintain visual and interaction consistency across the application
- **Accessibility:** Build inclusive experiences for all users
- **Clarity:** Prioritize clear communication and intuitive interactions

---

## Typography

**Font Family:**
- **Primary:** Saans (loaded automatically from Stardust)
- All typography should use the Saans font family

**Type Scale:**
Use Stardust's semantic text sizes:
- `text-5xl` - Extra large headings (48px)
- `text-4xl` - Large headings (36px)
- `text-3xl` - Page titles (30px)
- `text-2xl` - Section headings (24px)
- `text-xl` - Subsection headings (20px)
- `text-l` - Large body text (18px)
- `text-m` - Default body text (16px)
- `text-s` - Small text, captions (14px)
- `text-xs` - Tiny text, labels (12px)

**Font Weights:**
- `font-semibold` (670) - Headings, emphasis
- `font-medium` (570) - Subheadings, buttons
- `font-regular` (400) - Body text, default

**Text Hierarchy:**
```tsx
<h1 className="text-3xl font-semibold text-primary">Page Title</h1>
<h2 className="text-xl font-semibold text-primary">Section Title</h2>
<p className="text-m text-secondary">Body text and descriptions</p>
<span className="text-s text-secondary">Helper text and metadata</span>
```

---

## Layout System

### Spacing Scale (DOUBLED!)

**⚠️ CRITICAL:** Stardust spacing is **DOUBLE** standard Tailwind (base unit: 8px vs 4px)

**Common Spacing Values:**
- `gap-1` / `p-1` / `m-1` = 8px (tight spacing)
- `gap-2` / `p-2` / `m-2` = 16px (small spacing)
- `gap-3` / `p-3` / `m-3` = 24px (medium spacing)
- `gap-4` / `p-4` / `m-4` = 32px (standard spacing) ✅ Most common
- `gap-6` / `p-6` / `m-6` = 48px (large spacing)
- `gap-8` / `p-8` / `m-8` = 64px (extra large spacing)

**Layout Patterns:**
```tsx
// Card with standard padding
<div className="p-4 rounded-base bg-primary shadow-card">Content</div>

// Flex layout with proper gaps
<div className="flex gap-2 items-center">Items with 16px spacing</div>

// Section spacing
<section className="mt-6 mb-8">Section with vertical spacing</section>
```

### Container Strategy

Use the provided Layout components from `@/components/layouts`:

```tsx
import { Layout, PanelGrid, FiftyFiftyGrid } from "@/components/layouts";

// Standard page layout
<Layout width="default" gutters="default">
  <h1>Page Content</h1>
</Layout>

// Narrow content (800px)
<Layout width="narrow">
  <article>Article content</article>
</Layout>

// Full width
<Layout width="full" gutters="minimal">
  <div>Full-width content</div>
</Layout>
```

**Width Options:**
- `default` - 1024px (standard pages)
- `narrow` - 800px (articles, forms)
- `slim` - 560px (centered content)
- `full` - 100% (dashboards, tables)

---

## Component Usage Guidelines

### Always Use Stardust Components

**DO:**
```tsx
import { Button, Badge, Link, TextInput } from '@multiverse-io/stardust-react';

<Button variant="primary">Submit</Button>
<Badge purpose="success">Active</Badge>
<Link href="/about">About</Link>
<TextInput id="email" label="Email" />
```

**DON'T:**
```tsx
// ❌ Never create custom styled elements for existing components
<div className="bg-action px-4 py-2 rounded-md cursor-pointer">Submit</div>
<span className="bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
<a className="text-action underline">About</a>
<input className="border p-2 rounded" />
```

### Component Selection Guide

**Buttons & Actions:**
- Use `<Button>` for all clickable actions
- Use `<Link>` for all navigation links
- Use `<CopyToClipboard>` for text copying

**Forms:**
- Use `<TextInput>` for single-line text
- Use `<Textarea>` for multi-line text
- Use `<Select>` for dropdown selections
- Use `<Checkbox>` for binary choices
- Use `<RadioInput>` for single selection from options
- Use `<Switch>` for immediate toggle actions
- Use `<DatePicker>` for date inputs

**Feedback:**
- Use `<Badge>` for status indicators (NOT clickable)
- Use `toasts` for temporary notifications
- Use `<Callout>` for important messages
- Use `<Progress>` for loading/completion
- Use `<Skeleton>` for loading states

**Layout:**
- Use `<Accordion>` for collapsible sections
- Use `<Tabs>` for tabbed content
- Use `<Dialog>` for modals
- Use `<AlertDialog>` for confirmations
- Use `<CardButton>` for clickable cards

---

## Color & Theming

### Use Semantic Tokens

**Text Colors:**
- `text-primary` - Main content, headings
- `text-secondary` - Supporting text, descriptions
- `text-action` - Interactive links
- `text-success` - Success messages
- `text-negative` - Error messages
- `text-warning` - Warning messages
- `text-info` - Info messages

**Backgrounds:**
- `bg-primary` - Main content areas (white)
- `bg-secondary` - Subtle sections (light gray)
- `bg-inverse-primary` - Dark backgrounds
- `bg-action` - Action buttons
- `bg-success/negative/warning/info` - Status backgrounds

**Borders:**
- `border-separator-primary` - Dividers, card borders
- `border-input` - Form field borders
- `border-success/negative/warning` - Status borders

### Color Application Examples

```tsx
// Page structure
<div className="bg-primary">
  <header className="border-b border-separator-primary">
    <h1 className="text-primary">Title</h1>
  </header>
  <section className="bg-secondary">
    <p className="text-secondary">Description</p>
  </section>
</div>

// Status indicators
<Badge purpose="success">Success</Badge>
<p className="text-negative">Error message</p>
<div className="bg-warning text-warning-dark p-4">Warning banner</div>

// Interactive elements
<Button variant="primary">Primary Action</Button>
<Link href="#" className="text-action">Learn more</Link>
```

---

## Visual Design

### Border Radius

Use Stardust's border radius scale:
- `rounded-none` - 0px (no rounding)
- `rounded-base` - 4px (default, most common) ✅
- `rounded-md` - 6px (medium)
- `rounded-lg` - 8px (large)
- `rounded-full` - Perfect circle/pill

**Usage:**
```tsx
<div className="rounded-base">Default rounded corners</div>
<Button className="rounded-full">Pill-shaped button</Button>
```

### Shadows

Use semantic shadow utilities:
- `shadow-card` - Card elevation
- `shadow-button-default` - Button default shadow
- `shadow-button-hover` - Button hover shadow
- `shadow-button-active` - Button pressed shadow

**Usage:**
```tsx
<div className="bg-primary border border-separator-primary rounded-base shadow-card p-4">
  Card with elevation
</div>
```

### Spacing Consistency

**Small:** `gap-2`, `p-2` (16px) - Tight spacing within components
**Medium:** `gap-4`, `p-4` (32px) - Standard component padding ✅ Most common
**Large:** `gap-6`, `p-6` (48px) - Section spacing
**XLarge:** `gap-8`, `p-8` (64px) - Major section spacing

---

## Interactions & States

### Button States

Stardust buttons handle states automatically:
```tsx
<Button variant="primary">Normal</Button>
<Button variant="primary" disabled>Disabled</Button>
```

**DO NOT manually style hover/active states** - components handle this.

### Form Validation

Use component props for validation:
```tsx
<TextInput 
  id="email"
  label="Email"
  errors={["Invalid email format"]}
/>

<TextInput 
  id="username"
  label="Username"
  success="Username is available!"
/>
```

### Loading States

```tsx
// Skeleton for loading content
<Skeleton className="w-full h-12" />

// Progress indicators
<Progress value={75} variant="primary" />

// Disabled buttons during loading
<Button disabled>Loading...</Button>
```

---

## Accessibility Guidelines

### Semantic HTML

Always use proper semantic HTML elements:
```tsx
<header>Header content</header>
<nav>Navigation</nav>
<main>Main content</main>
<article>Article content</article>
<section>Section content</section>
<footer>Footer content</footer>
```

### Labels & ARIA

- All form inputs must have labels
- Use `aria-label` for icon-only buttons
- Add `data-testid` for testing

```tsx
<TextInput id="email" label="Email Address" />
<Button aria-label="Delete item">
  <TrashIcon />
</Button>
<div data-testid="user-profile">Profile</div>
```

### Keyboard Navigation

- All interactive elements must be keyboard accessible
- Use proper focus indicators (Stardust handles this)
- Support standard keyboard shortcuts (Enter, Space, Escape)

### Color Contrast

- Use semantic tokens to ensure proper contrast
- `text-primary` on `bg-primary` (dark on light)
- `text-white` on `bg-inverse-primary` (light on dark)
- Status colors have proper contrast ratios built-in

---

## Responsive Design

### Mobile-First Approach

Use Tailwind's responsive prefixes:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns
</div>

<h1 className="text-2xl md:text-3xl lg:text-4xl">
  Responsive heading size
</h1>
```

### Breakpoints

- **sm:** 640px (mobile landscape)
- **md:** 768px (tablet)
- **lg:** 1024px (desktop)
- **xl:** 1280px (large desktop)

---

## Navigation Patterns

### Use NavigationLayout

The app includes a pre-built navigation component:
```tsx
import NavigationLayout from "@/components/navigation";

<NavigationLayout>
  <YourPageContent />
</NavigationLayout>
```

Features:
- Sidebar navigation with icons
- Active page highlighting
- Responsive collapse on mobile

### Adding Navigation Items

Edit `client/src/components/navigation.tsx`:
```tsx
<NavigationMenuItem
  as={Link}
  href="/your-page"
  renderIcon={(iconProps) => <YourIcon {...iconProps} />}
  active={location === "/your-page"}
>
  Your Page
</NavigationMenuItem>
```

---

## Icons

### Using Stardust Icons

Import from `@multiverse-io/stardust-react`:
```tsx
import { CheckIcon, AlertIcon, HomeIcon } from '@multiverse-io/stardust-react';

<CheckIcon variant="success" size="medium" />
<AlertIcon variant="negative" />
<HomeIcon size="small" />
```

**279+ icons available** including:
- Navigation icons (Home, Settings, Menu, etc.)
- Action icons (Plus, Edit, Delete, etc.)
- Status icons (Check, Alert, Info, etc.)
- UI icons (Search, Filter, Calendar, etc.)

### Icon Variants & Sizes

**Variants (colors):**
- `primary`, `secondary`, `action`
- `success`, `negative`, `warning`, `info`

**Sizes:**
- `small` - 16px
- `medium` - 24px
- `default` - 24px (inherits)

---

## Data Display

### Lists

```tsx
<ul className="space-y-2">
  <li className="flex items-center gap-2">
    <CheckIcon size="small" />
    <span>List item</span>
  </li>
</ul>
```

### Cards

```tsx
<CardButton>
  <div className="p-6">
    <h3 className="text-l font-semibold text-primary">Card Title</h3>
    <p className="text-secondary mt-2">Card description</p>
  </div>
</CardButton>
```

### Tables

For tabular data, use Stardust's Table component (see full documentation).

---

## Best Practices Summary

### ✅ DO:
- Use Stardust components for all UI elements
- Apply semantic tokens (text-primary, bg-action, etc.)
- Remember doubled spacing scale (p-4 = 32px)
- Use Tailwind utility classes only
- Add data-testid attributes for testing
- Follow accessibility guidelines
- Use component variants and props

### ❌ DON'T:
- Create custom components when Stardust provides them
- Use CSS variables directly in styles
- Use foundation tokens where semantic ones exist
- Manually style hover/active states
- Forget to add labels to form inputs
- Use standard Tailwind spacing values
- Nest interactive elements (button in button)

---

## Testing & Quality

### Test IDs

Add `data-testid` to all interactive elements:
```tsx
<Button data-testid="button-submit">Submit</Button>
<TextInput id="email" data-testid="input-email" label="Email" />
<Link href="/about" data-testid="link-about">About</Link>
```

### Patterns:
- Interactive: `button-{action}`, `input-{field}`
- Display: `text-{content}`, `card-{type}`
- Dynamic lists: `item-{id}`, `row-{index}`

---

## Performance

### Loading States

Show immediate feedback:
```tsx
{isLoading ? (
  <Skeleton className="w-full h-12" />
) : (
  <div>Loaded content</div>
)}
```

### Optimization

- Use React Query for data fetching (already configured)
- Lazy load routes and large components
- Optimize images and assets
- Use skeleton screens for better perceived performance

---

## Reference

- **Custom Instructions:** `custom_instruction/instructions.md`
- **Stardust Package:** `@multiverse-io/stardust-react`
- **Project Components:** `client/src/components/`
- **Replit Guidelines:** `replit.md`

---

**Remember:** Stardust handles the complexity. Focus on building features with components, semantic tokens, and proper spacing!
