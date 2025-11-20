# UI Color Reference

This document outlines the comprehensive color theme used across the HelpUp website. The color scheme is based on the visible design elements extracted from CSS files, Tailwind configuration, and component styles. Colors are categorized into primary, secondary, accent, neutral/grayscale, and brand-specific hues.

## Primary Colors

Primary colors form the core of the brand identity and are used for key interactive elements and branding.

### Glory Red

- **Hex:** `#a50805`
- **RGB:** `(165, 8, 5)`
- **HSL:** `(2, 94%, 33%)`
- **Usage:** Primary brand color for main call-to-action buttons, links, modal titles, navigation hover states, and accent elements. Conveys urgency and importance, commonly used in donation buttons and highlighted text.

### Crimson Red

- **Hex:** `#d32f2f`
- **RGB:** `(211, 47, 47)`
- **HSL:** `(0, 64%, 51%)`
- **Usage:** Secondary red for button hover states, gradients, and error messages. Provides a lighter variant of the primary red for interactive feedback and alerts.

## Secondary Colors

Secondary colors support the primary palette and are used for text and supporting elements.

### Chocolate Brown

- **Hex:** `#624d41`
- **RGB:** `(98, 77, 65)`
- **HSL:** `(22, 20%, 32%)`
- **Usage:** Main text color for body text, headings, and descriptions. Ensures readability on light backgrounds and provides a warm, earthy tone that complements the brand.

### Reynard Brown

- **Hex:** `#b56547`
- **RGB:** `(181, 101, 71)`
- **HSL:** `(18, 43%, 50%)`
- **Usage:** Used for organization names in donation cards and secondary text elements. Adds warmth and hierarchy to content without overpowering the primary colors.

## Accent Colors

Accent colors are used sparingly for specific states and feedback.

### Success Green

- **Hex:** `#4caf50`
- **RGB:** `(76, 175, 80)`
- **HSL:** `(122, 61%, 43%)`
- **Usage:** Indicates success states in forms and user feedback, such as confirmation messages after successful registration or submission.

### Error Red

- **Hex:** `#d32f2f`
- **RGB:** `(211, 47, 47)`
- **HSL:** `(0, 64%, 51%)`
- **Usage:** Used for error messages, validation feedback, and alerts. Note: This is the same as Crimson Red but serves a specific semantic purpose.

## Neutral/Grayscale Colors

Neutral colors provide balance and are used for backgrounds, borders, and secondary text.

### Swank Grey

- **Hex:** `#b6b1b2`
- **RGB:** `(182, 177, 178)`
- **HSL:** `(330, 3%, 71%)`
- **Usage:** Light grey for footer text and subtle secondary information. Offers a soft, muted tone for less prominent content.

### Petrified Grey

- **Hex:** `#8b8580`
- **RGB:** `(139, 133, 128)`
- **HSL:** `(30, 4%, 52%)`
- **Usage:** Medium grey for form borders, progress bars, and background elements. Provides definition without being harsh.

### Black Slug

- **Hex:** `#301d14`
- **RGB:** `(48, 29, 20)`
- **HSL:** `(18, 41%, 13%)`
- **Usage:** Dark brown/black for footer backgrounds, contact form text, and deep background sections. Creates contrast and depth in the design.

## Brand-Specific Hues

These are custom colors defined in the Tailwind configuration, representing the unique brand palette.

- **Glory Red** (`#a50805`): As above.
- **Crimson Red** (`#d32f2f`): As above.
- **Reynard** (`#b56547`): As above.
- **Chocolate Choco** (`#624d41`): As above.
- **Petrified** (`#8b8580`): As above.
- **Swank Grey** (`#b6b1b2`): As above.
- **Black Slug** (`#301d14`): As above.

## Accessibility Guidelines

Color contrast is crucial for readability and compliance with WCAG guidelines. All color combinations should meet at least WCAG AA standards:

- **Normal text (under 18pt or 14pt bold):** 4.5:1 contrast ratio
- **Large text (18pt+ or 14pt+ bold):** 3:1 contrast ratio

### Key Contrast Checks:

- Glory Red (`#a50805`) on White (`#ffffff`): ~4.6:1 ✅ (Meets AA for normal text)
- Chocolate Brown (`#624d41`) on White (`#ffffff`): ~7.2:1 ✅
- Swank Grey (`#b6b1b2`) on Black Slug (`#301d14`): ~2.8:1 ⚠️ (May not meet AA; use for decorative purposes only)
- White (`#ffffff`) on Black Slug (`#301d14`): ~12.6:1 ✅

Always test combinations using tools like WebAIM Contrast Checker. Avoid relying solely on color for conveying information; use icons, text, or patterns as supplements.

## Color Combinations for Harmony

- **Primary + Neutral:** Glory Red buttons on white or light grey backgrounds for high visibility and action-oriented design.
- **Secondary + Accent:** Chocolate Brown text with Success Green for positive confirmations.
- **Warm Palette:** Combine Reynard Brown with Glory Red for cohesive, earthy themes in cards and sections.
- **Dark Mode Elements:** Black Slug backgrounds with Swank Grey text for footer and secondary sections.
- **Gradients:** Use Glory Red to Crimson Red for buttons and progress indicators to add depth.

Avoid clashing warm tones; balance reds and browns with sufficient neutrals.

## Examples of Color Application

### Headers and Titles

- Main headings use Chocolate Brown (`#624d41`) for body text, with Glory Red (`#a50805`) accents for key words or spans (e.g., hero section titles).

### Buttons and Links

- Primary buttons: Gradient from Glory Red (`#a50805`) to Crimson Red (`#d32f2f`), white text (`#ffffff`).
- Secondary buttons: Light backgrounds with Glory Red borders and text.
- Links: Glory Red with Crimson Red hover states.

### Backgrounds

- Light sections: White (`#ffffff`) or off-white (`#f8f9fa`).
- Dark sections: Black Slug (`#301d14`) for footer and contact areas.
- Modal overlays: Semi-transparent black (`rgba(0, 0, 0, 0.7)`).

### Forms and Inputs

- Input borders: Petrified Grey (`#8b8580`), focus state: Glory Red (`#a50805`).
- Labels: Chocolate Brown (`#624d41`).
- Error states: Crimson Red (`#d32f2f`) text and borders.

### Alerts and Feedback

- Success: Success Green (`#4caf50`) background with white text.
- Error: Light red background with Crimson Red (`#d32f2f`) text.
- Info: Light grey backgrounds with Chocolate Brown text.

### Cards and Components

- Donation cards: White backgrounds with Reynard Brown (`#b56547`) for organization names and Glory Red progress bars.
- Statistics: Glory Red numbers on dark backgrounds for emphasis.

This color reference ensures consistency across the UI while maintaining accessibility and visual harmony. When adding new elements, refer to these guidelines to preserve the brand's cohesive appearance.
