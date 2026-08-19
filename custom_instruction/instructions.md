# Stardust Design System - Development Guide

## 🎯 Best Practices & Golden Rules

### Core Principles

1. **ALWAYS USE STARDUST COMPONENTS** - Never create custom components when Stardust provides one
   - Use `<Button>` instead of styled divs
   - Use `<Link>` instead of anchor tags
   - Use `<Badge>` instead of custom spans
   - Components come with accessibility, interactions, and theming built-in

2. **⚠️ SPACING IS DOUBLED** - The #1 mistake to avoid
   - Stardust's base unit is `0.5rem (8px)` vs Tailwind's `0.25rem (4px)`
   - `p-4` = **32px** (not 16px!)
   - `gap-2` = **16px** (not 8px!)
   - If a design calls for 32px padding, use `p-4` (not `p-8`)

3. **ALWAYS USE TAILWIND UTILITIES** - Never use CSS variables directly
   ```tsx
   // ✅ CORRECT
   <div className="bg-action text-white p-4 rounded-base">Content</div>
   
   // ❌ WRONG
   <div style={{ backgroundColor: 'var(--bg-color-action)' }}>Content</div>
   ```

4. **PREFER SEMANTIC TOKENS** - Use meaningful tokens over foundation colors
   ```tsx
   // ✅ CORRECT - semantic tokens convey meaning
   <button className="bg-action text-white">Primary Action</button>
   <p className="text-success">Success message</p>
   
   // ❌ AVOID - foundation tokens where semantic ones exist
   <button className="bg-blue-600 text-white">Primary Action</button>
   <p className="text-green-600">Success message</p>
   ```

5. **USE COMPONENT VARIANTS** - Don't recreate component styles manually
   ```tsx
   // ✅ CORRECT
   <Button variant="primary">Submit</Button>
   
   // ❌ AVOID
   <div className="bg-action px-4 py-2 rounded-md cursor-pointer">Submit</div>
   ```

---

## 🏗️ Project-Specific Components

### Layout Components (`@/components/layouts`)

Pre-built layout utilities for consistent page structure:

```tsx
import { Layout, PanelGrid, PanelMain, PanelAside, FiftyFiftyGrid } from "@/components/layouts";

// Standard page layout with max-width and padding
<Layout width="default" gutters="default">
  <h1>Page Content</h1>
</Layout>

// Two-column layout with main content and sidebar
<PanelGrid>
  <PanelMain>Main content here</PanelMain>
  <PanelAside>Sidebar content</PanelAside>
</PanelGrid>

// 50/50 split layout
<FiftyFiftyGrid>
  <div>Left column</div>
  <div>Right column</div>
</FiftyFiftyGrid>
```

**Layout Props:**
- `width`: "default" (1024px), "narrow" (800px), "slim" (560px), "full" (100%)
- `gutters`: "default", "minimal", "zero"

### Navigation Component (`@/components/navigation`)

Application-wide navigation wrapper with sidebar menu:

```tsx
import NavigationLayout from "@/components/navigation";

// Wraps your entire app with sidebar navigation
<NavigationLayout>
  <YourPageContent />
</NavigationLayout>
```

**Features:**
- Sidebar navigation with icons
- Active page highlighting
- Uses wouter for routing
- Stardust NavigationRoot/NavigationMenu components

### Branding & Logos

**Multiverse Logo Assets** are available in `client/src/assets/`:

1. **multiverse-logo.svg** - Full Multiverse wordmark logo (123×48px)
2. **multiverse_hexagon.svg** - Hexagonal Multiverse icon (44×38px)

```tsx
import multiverseLogo from '@/assets/multiverse-logo.svg';
import multiverseHexagon from '@/assets/multiverse_hexagon.svg';

// Full logo usage
<img src={multiverseLogo} alt="Multiverse" className="w-[123px] h-[48px]" />

// Icon usage
<img src={multiverseHexagon} alt="Multiverse" className="w-[44px] h-[38px]" />
```

**Logo Placement Rules:**
- ⚠️ **The Multiverse logo MUST always appear in the top-left** of the application
- Use the full wordmark (`multiverse-logo.svg`) in headers/navigation
- Use the hexagon icon (`multiverse_hexagon.svg`) for compact spaces or as a favicon
- The logo should link to the home page or main dashboard
- Maintain proper spacing around the logo (minimum 16px padding)

**Example Header Implementation:**
```tsx
<header className="border-b border-separator-primary bg-primary">
  <div className="flex items-center justify-between p-4">
    <Link href="/" className="flex items-center">
      <img src={multiverseLogo} alt="Multiverse" className="w-[123px]" />
    </Link>
    {/* Other header content */}
  </div>
</header>
```

---

## 📦 Stardust Component Library

### Buttons & Actions

#### Button
Primary interactive element with multiple variants and sizes.

```tsx
import { Button } from '@multiverse-io/stardust-react';

<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="text">Text Button</Button>
<Button variant="negative">Delete</Button>

// Sizes
<Button size="large">Large</Button>
<Button size="default">Default</Button>
<Button size="small">Small</Button>
<Button size="tiny">Tiny</Button>

// With icons
<Button>
  <PlusIcon size="small" />
  Add Item
</Button>
```

**When to use:** Main user actions, form submissions, navigation triggers

**Variants:** primary, secondary, text, negative, outline

**Sizes:** large, default, small, tiny

#### Link
Navigation links with proper accessibility.

```tsx
import { Link } from '@multiverse-io/stardust-react';

<Link href="/about">Internal Link</Link>
<Link href="https://example.com" isExternal>External Link</Link>
<Link href="https://example.com" isExternal target="_blank" rel="noopener noreferrer">
  Opens in New Tab
</Link>
```

**When to use:** Text-based navigation, inline links within content

#### CopyToClipboard
Text copying utility for sharing codes, URLs, API keys.

```tsx
import { CopyToClipboard } from '@multiverse-io/stardust-react';

<CopyToClipboard
  id="share-link"
  value="https://example.com"
  label="Share this link"
  hideLabel={false}
  buttonText="Copy link"
/>
```

---

### Form Inputs

#### TextInput
Single-line text input with validation states.

```tsx
import { TextInput } from '@multiverse-io/stardust-react';

<TextInput 
  id="email"
  label="Email Address"
  placeholder="you@example.com"
  errors={["Invalid email format"]}
/>

<TextInput 
  id="username"
  label="Username"
  success="Username is available!"
/>
```

**When to use:** Short text entry (names, emails, search)

**Features:** Validation states, helper text, icons

#### Textarea
Multi-line text input for longer content.

```tsx
import { Textarea } from '@multiverse-io/stardust-react';

<Textarea
  id="description"
  label="Description"
  placeholder="Enter a description..."
  rows={4}
/>
```

**When to use:** Long-form text (comments, descriptions, messages)

#### Select
Dropdown selection for choosing from multiple options.

```tsx
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@multiverse-io/stardust-react';

<Select id="country" label="Country">
  <SelectTrigger>
    <SelectValue placeholder="Choose a country" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="us">United States</SelectItem>
    <SelectItem value="uk">United Kingdom</SelectItem>
    <SelectItem value="ca">Canada</SelectItem>
  </SelectContent>
</Select>
```

**When to use:** Choosing one option from a list (5+ options)

#### RadioInput
Radio button groups for single selection.

```tsx
import { RadioInput } from '@multiverse-io/stardust-react';

<RadioInput label="Option 1" name="choice" size="medium" />
<RadioInput label="Option 2" name="choice" size="medium" />
<RadioInput label="Option 3" name="choice" size="medium" />
```

**When to use:** Choosing one option from a small set (2-4 options)

#### Checkbox
Checkbox input for binary choices or multiple selections.

```tsx
import { Checkbox } from '@multiverse-io/stardust-react';

<Checkbox label="I agree to terms" name="terms" />
<Checkbox label="Subscribe to newsletter" name="subscribe" />
```

**When to use:** Binary choices, multiple selections, toggling options

#### Switch
Binary toggle control for immediate on/off actions.

```tsx
import { Switch } from '@multiverse-io/stardust-react';

<Switch label="Enable notifications" />
<Switch label="Dark mode" defaultChecked />
```

**When to use:** Immediate on/off actions, settings that don't require form submission

#### DatePicker
Date selection input.

```tsx
import { DatePicker } from '@multiverse-io/stardust-react';

<DatePicker id="start-date" label="Start Date" />
```

**When to use:** Date inputs for forms, scheduling

#### FormField & FormFieldset
Wrapper components for consistent form structure.

```tsx
import { FormField, FormFieldset } from '@multiverse-io/stardust-react';

<FormField label="Custom Field">
  <input type="text" />
</FormField>

<FormFieldset legend="Preferences">
  <Checkbox label="Option A" name="option-a" />
  <Checkbox label="Option B" name="option-b" />
</FormFieldset>
```

**When to use:** Wrap form inputs for consistent structure with labels and validation

---

### Feedback & Status

#### Badge
Status and category indicators (NOT for interactive elements).

```tsx
import { Badge } from '@multiverse-io/stardust-react';

// Purposes
<Badge purpose="success">Active</Badge>
<Badge purpose="warning">Pending</Badge>
<Badge purpose="negative">Error</Badge>
<Badge purpose="info">Information</Badge>
<Badge purpose="neutral">Default</Badge>
<Badge purpose="brand">Featured</Badge>

// Variants
<Badge purpose="success" variant="light">Light</Badge>
<Badge purpose="success" variant="subtle">Subtle (default)</Badge>
<Badge purpose="success" variant="heavy">Heavy</Badge>

// With icons
<Badge purpose="success">
  <CheckIcon size="small" />
  Verified
</Badge>
```

**When to use:** Static labels, status indicators, categories, counts

**Purposes:** success, warning, negative, info, neutral, brand

**Variants:** light (low emphasis), subtle (default), heavy (high emphasis)

**Features:** Optional icons, max-width 200px with truncation

#### Progress
Progress indicators for showing task completion.

```tsx
import { Progress } from '@multiverse-io/stardust-react';

<Progress 
  label="Upload Progress" 
  variant="primary" 
  value={65} 
  type="simple" 
/>
```

**When to use:** Showing completion status of tasks, loading progress

#### Skeleton
Loading placeholders to improve perceived performance.

```tsx
import { Skeleton } from '@multiverse-io/stardust-react';

<Skeleton className="w-20 h-4" />
<Skeleton className="w-full h-12" />
```

**When to use:** Content loading states, skeleton screens

#### Toasts
Notification system for temporary feedback messages.

```tsx
import { toasts, Toaster } from '@multiverse-io/stardust-react';

// In your App.tsx
<Toaster />

// In your components
toasts.success("Operation completed successfully");
toasts.info("New update available");
toasts.warning("Connection unstable", "Please check your network");
toasts.error("Failed to save", "An unexpected error occurred");
```

**When to use:** Temporary feedback messages, success/error notifications

#### Callout
Informational message blocks for important information.

```tsx
import { CalloutRoot, CalloutHeader, CalloutContent } from '@multiverse-io/stardust-react';

<CalloutRoot>
  <CalloutHeader>Important Information</CalloutHeader>
  <CalloutContent>
    This is an important message that users should be aware of.
    It provides context and guidance.
  </CalloutContent>
</CalloutRoot>
```

**When to use:** Important information, tips, warnings within content

#### EnvironmentIndicator
Environment status display (dev, staging, production).

```tsx
import { EnvironmentIndicator } from '@multiverse-io/stardust-react';

<EnvironmentIndicator label="Internal prototyping only" />
```

**When to use:** Showing current environment status

---

### Layout & Navigation

#### Card & CardButton
Content containers and clickable card elements.

```tsx
import { CardButton } from '@multiverse-io/stardust-react';

<CardButton>
  <div className="p-6">
    <h3 className="text-l font-semibold">Card Title</h3>
    <p className="text-secondary">Card content goes here</p>
  </div>
</CardButton>
```

**When to use:** Grouping related content, creating visual hierarchy, clickable cards

#### Accordion
Collapsible content sections for organizing information.

```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@multiverse-io/stardust-react';

<Accordion type="single" collapsible defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>
      Content for section 1
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Section 2</AccordionTrigger>
    <AccordionContent>
      Content for section 2
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

**When to use:** Organizing content that users may not need all at once (FAQs, settings)

#### Tabs
Tabbed interfaces for organizing related content.

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@multiverse-io/stardust-react';

<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="details">Details</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview content</TabsContent>
  <TabsContent value="details">Details content</TabsContent>
  <TabsContent value="settings">Settings content</TabsContent>
</Tabs>
```

**When to use:** Organizing related content into separate views

#### Table
Data tables for displaying tabular information.

```tsx
// Complex component - see full Stardust documentation for table structure
```

**When to use:** Displaying tabular data, data grids

#### Pagination
Page navigation controls for large datasets.

```tsx
// Typically used with Table component
```

**When to use:** Navigating through large datasets split across pages

---

### Overlays & Dialogs

#### Dialog
Modal dialogs for focused tasks and forms.

```tsx
import { DialogRoot, DialogTrigger, DialogContent, DialogHeader, DialogBody } from '@multiverse-io/stardust-react';

<DialogRoot>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>Dialog Title</DialogHeader>
    <DialogBody>
      <p>Dialog content goes here</p>
    </DialogBody>
  </DialogContent>
</DialogRoot>
```

**When to use:** Focused tasks, forms, or content that requires user attention

#### AlertDialog
Modal dialogs for critical confirmations.

```tsx
import { 
  AlertDialogRoot, 
  AlertDialogTrigger, 
  AlertDialogContent, 
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from '@multiverse-io/stardust-react';

<AlertDialogRoot>
  <AlertDialogTrigger asChild>
    <Button variant="negative">Delete</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your data.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel asChild>
        <Button variant="secondary">Cancel</Button>
      </AlertDialogCancel>
      <AlertDialogAction asChild>
        <Button variant="negative">Delete</Button>
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialogRoot>
```

**When to use:** Destructive actions, important confirmations requiring explicit consent

#### SlideIn
Side panel/drawer for supplementary content.

```tsx
// Complex component with portal-based rendering
// See full Stardust documentation for implementation
```

**When to use:** Supplementary content, forms, filters that don't need full modal

#### Dropdown
Dropdown menus for actions and context menus.

```tsx
// Complex component - see full Stardust documentation
```

**When to use:** Action menus, context menus

---

### Icons

**279+ icons available** from `@multiverse-io/stardust-react`

```tsx
import { 
  CheckIcon, 
  AlertIcon, 
  InfoIcon, 
  EditIcon,
  HomeIcon,
  CodeIcon,
  BookIcon,
  PlusIcon
} from '@multiverse-io/stardust-react';

// Icon variants (colors)
<CheckIcon variant="primary" />
<CheckIcon variant="secondary" />
<CheckIcon variant="action" />
<CheckIcon variant="success" />
<CheckIcon variant="negative" />
<CheckIcon variant="info" />

// Icon sizes
<CheckIcon size="small" />    // 16px
<CheckIcon size="medium" />   // 24px  
<CheckIcon size="default" />  // 24px (inherits from parent)

// Combined
<CheckIcon variant="success" size="medium" />
```

**When to use:** Visual indicators, buttons, navigation, status

---

## 🎨 Design Tokens

### Spacing Scale (DOUBLED!)

| Class | Stardust | Standard Tailwind |
|-------|----------|-------------------|
| `p-1` | 8px | 4px ❌ |
| `p-2` | 16px | 8px ❌ |
| `p-3` | 24px | 12px ❌ |
| `p-4` | **32px** ✅ | 16px ❌ |
| `p-6` | 48px | 24px ❌ |
| `p-8` | 64px | 32px ❌ |

**Applies to:** padding, margin, gap, width, height, space

### Typography

**Font Family:** Saans (loaded automatically)

**Sizes:** `text-xs`, `text-s`, `text-m`, `text-l`, `text-xl`, `text-2xl`, `text-3xl`, `text-4xl`, `text-5xl`

**Weights:** `font-regular` (400), `font-medium` (570), `font-semibold` (670)

```tsx
<h1 className="text-3xl font-semibold text-primary">Page Title</h1>
<h2 className="text-xl font-semibold text-primary">Section Title</h2>
<p className="text-m text-secondary">Body text</p>
<span className="text-s text-secondary">Helper text</span>
```

### Semantic Color Tokens

**Text Colors:**
- `text-primary` - Main headings, important text
- `text-secondary` - Supporting text, descriptions
- `text-action` - Interactive links/actions
- `text-success` - Success messages
- `text-negative` - Error messages
- `text-warning` - Warning messages
- `text-info` - Info messages
- `text-white` - White text (on dark backgrounds)

**Background Colors:**
- `bg-primary` - Main content (white)
- `bg-secondary` - Subtle sections (light gray)
- `bg-inverse-primary` - Dark backgrounds
- `bg-action` - Action buttons
- `bg-success` - Success backgrounds (light)
- `bg-negative` - Error backgrounds (light)
- `bg-warning` - Warning backgrounds (light)
- `bg-info` - Info backgrounds (light)

**Border Colors:**
- `border-separator-primary` - Dividers, borders
- `border-input` - Form field borders
- `border-input-hover` - Form field hover state
- `border-input-active` - Form field focus state
- `border-success` - Success state borders
- `border-negative` - Error state borders
- `border-warning` - Warning state borders

**Icon Colors:**
- `fill-primary`, `fill-secondary`, `fill-action`
- `fill-success`, `fill-negative`, `fill-info`

### Border Radius

- `rounded-none` - 0px
- `rounded-sm` - 2px
- `rounded-base` - 4px (default)
- `rounded-md` - 6px
- `rounded-lg` - 8px
- `rounded-xl` - 12px
- `rounded-2xl` - 16px
- `rounded-full` - 9999px (perfect circle)

### Shadows

- `shadow-card` - Card elevation
- `shadow-button-default` - Default button shadow
- `shadow-button-hover` - Button hover shadow
- `shadow-button-active` - Button active shadow

---

## 🚫 Common Mistakes to Avoid

1. **Using standard Tailwind spacing values**
   ```tsx
   // ❌ WRONG - This is 64px!
   <div className="p-8">Too much padding</div>
   
   // ✅ CORRECT - This is 32px
   <div className="p-4">Proper padding</div>
   ```

2. **Creating custom components instead of using Stardust**
   ```tsx
   // ❌ WRONG
   <div className="bg-action px-4 py-2 rounded-md cursor-pointer" onClick={...}>
     Click me
   </div>
   
   // ✅ CORRECT
   <Button variant="primary" onClick={...}>Click me</Button>
   ```

3. **Using CSS variables directly**
   ```tsx
   // ❌ WRONG
   <div style={{ backgroundColor: 'var(--bg-color-action)' }}>Content</div>
   
   // ✅ CORRECT
   <div className="bg-action">Content</div>
   ```

4. **Using foundation tokens where semantic ones exist**
   ```tsx
   // ❌ AVOID
   <p className="text-green-600">Success message</p>
   
   // ✅ CORRECT
   <p className="text-success">Success message</p>
   ```

5. **Manually styling form inputs**
   ```tsx
   // ❌ WRONG
   <input className="border border-gray-300 p-2 rounded" />
   
   // ✅ CORRECT
   <TextInput id="field" label="Field Name" />
   ```

---

## 📚 Additional Resources

- **Component Documentation:** See full Stardust documentation for complex components
- **Figma Designs:** Check Figma for semantic token usage and exact specifications
- **replit.md:** Project-specific guidelines and preferences
- **Stardust Package:** `@multiverse-io/stardust-react`
- **Stardust CSS:** `@multiverse-io/stardust/stardust-tokens.css`

---

## ✅ Quick Checklist for New Components

- [ ] Check if a Stardust component exists for this purpose
- [ ] Use semantic tokens instead of foundation colors
- [ ] Apply doubled spacing scale (`p-4` = 32px)
- [ ] Use Tailwind utilities (not CSS variables)
- [ ] Add proper `data-testid` attributes for testing
- [ ] Use component variants instead of custom styling
- [ ] Check existing components in `@/components/` directory
- [ ] Ensure accessibility (semantic HTML, ARIA labels)

---

**Remember:** The design system handles complexity so you can focus on building features. When in doubt, use Stardust components!
