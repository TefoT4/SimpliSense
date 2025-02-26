# SimpliSense Website Implementation Checklist

Below is the updated, comprehensive markdown checklist for the **Website** folder of the SimpliSense project. It covers every feature of the web application—from environment setup, static content verification, and navigation fixes with smooth scrolling, to dynamic features such as authentication, chat history, subscription management (with PayPal), analytics, and more. It also outlines tasks for refactoring and reusing UI controls (with dark theme support) in the `controls` folder, as well as robust UI/UX improvements like enhanced typography and consistent styling. **For every control, ensure that styling, effects, and typography are maintained consistently.** Completed tasks are marked with `[x]` and pending tasks with `[ ]`.

> **Project Structure:**  
>
> - **SimpliSense**  
>   - **Backend**  
>   - **Browser_Extension**  
>   - **Website** (this is your working folder)
>     - **app**
>       - **components**
>         - **controls**
>           - **Card.tsx**
>           - **CustomButton.tsx**
>           - **InputField.tsx**
>           - **NavLink.tsx**
>           - **Tag.tsx**
>         - **Blog.tsx**
>         - **Footer.tsx**
>         - **Header.tsx**
>         - **Hero.tsx**
>         - **Pricing.tsx**
>         - **Features.tsx**
>         - **CaseStudies.tsx**
>     - **public**
>       - **images**
>         - **blog**
>           - **emily-carter.png**
>           - **michael-brown.png**
>           - **sophia-rodriguez.png**
>       - **academin.png**
>       - **business.png**
>       - **learning.png**
>       - **hero.webp**
>       - **demo.gif**
>       - **simpliSense.png**

---

## 1. Integrate and Enhance All Web Application Features in the Website Folder

### 1.1 Environment Setup and Validation

- [x] Verify the Next.js app runs with `npm run dev` in the Website folder without errors.  
  *Expected State:* The index page renders Header, Hero, Features, CaseStudies, Blog, Pricing, and Footer correctly.
- [x] Run `npm run build` to confirm there are no TypeScript or bundling errors.  
  *Expected Data:* Successful build output with no warnings or errors.

### 1.2 Run the Project Before Reviewing Components

- [x] Execute `npm run dev` and verify that the application starts and displays the index page.  
  *Expected State:* The application loads in the browser without errors before proceeding to component-specific tasks.

### 1.3 Refactor and Integrate Reusable UI Controls in the Controls Folder

- [x] **Establish a "controls" Folder**  
  - [x] Create a dedicated `controls` folder within the project structure to house all reusable UI components.

- [x] **CustomButton Component**  
  - [x] Create `CustomButton.tsx` supporting variants: `primary`, `danger`, `default`, etc.  
    *Data/Expected State:* Renders correctly for each variant; verifies hover, active, and disabled states; supports dark theme (e.g., `dark:bg-blue-700` for primary).
  - [x] **Validation:** Ensure that all buttons across the project are imported from this `CustomButton` component.
  - [x] **UI/UX Requirements:** Maintain consistent styling, effects, and typography.

- [x] **NavLink Component**  
  - [x] Create `NavLink.tsx` for anchor-based navigation links with smooth scrolling.  
    *Expected State:* Renders with provided `href` and label; supports hover and active states in both light and dark themes.
  - [x] **Validation:** Confirm that Header navigation links use this `NavLink` component.
  - [x] **UI/UX Requirements:** Maintain consistent styling, effects, and typography.

- [x] **InputField Component**  
  - [x] Develop `InputField.tsx` for form inputs with built-in validation and error styling.  
    *Data/Expected State:* Renders input fields for types such as text, email, and password; displays error state (e.g., red border) when validation fails; supports dark mode.
  - [x] **Validation:** Ensure that login, registration, and profile forms import `InputField` from the controls folder.
  - [x] **UI/UX Requirements:** Maintain consistent styling, effects, and typography.

- [x] **Tag Component**  
  - [x] Create `Tag.tsx` for displaying category tags.  
    *Expected State:* Renders a tag with a label (e.g., "Education"); optionally wraps in an anchor if `href` is provided; styled for both light and dark themes.
  - [x] **Validation:** Confirm that blog posts use the `Tag` component for category tags.
  - [x] **UI/UX Requirements:** Maintain consistent styling, effects, and typography.

- [x] **Card Component**  
  - [x] Create `Card.tsx` for case studies and blog previews.  
    *Data/Expected State:* Accepts title, image, and description; renders with consistent padding, border, and shadow; supports dark mode.
  - [x] **Validation:** Verify that Case Studies and Blog components import and use the `Card` component.
  - [x] **UI/UX Requirements:** Maintain consistent styling, effects, and typography.

- [x] **Modal Component (Optional)**  
  - [x] Create `Modal.tsx` for displaying prompts or feedback.  
    *Expected State:* Renders with an overlay and centered content; supports closing functionality; styled appropriately for both light and dark themes.
  - [x] **UI/UX Requirements:** Maintain consistent styling, effects, and typography.

### 1.4 Fix and Test Navigation Links with Smooth Scrolling

- [x] Add unique IDs to index page sections:  
  *Data:* `<section id="features">`, `<section id="how-it-works">`, `<section id="pricing">`, `<section id="blog">`.
- [x] Update the Header navigation links to use anchor tags:  
  *Expected State:* Navigation link for "Features" becomes `<a href="#features">Features</a>`, and clicking it scrolls to the section with `id="features"`.
- [x] Enable smooth scrolling by adding `scroll-behavior: smooth;` in global CSS (or Tailwind configuration on the `html` element).
- [x] Implement Scroll to Top functionality by creating a `ScrollToTop` component that appears on scroll and returns the page to the top when clicked.
- [x] Test navigation:  
  *Expected State:* Each link smoothly scrolls to its corresponding section, and the Scroll to Top button functions correctly.

### 1.5 Enhance the Header Component

- [x] Verify the Header displays the logo (from `simpliSense.png`), navigation links (using the new `NavLink` component with anchors), and a "Login" button.
- [x] Simulate logged-out state:  
  *Expected State:* "Login" and "Register" buttons are visible.
- [x] Simulate logged-in state:  
  *Step Detail:* Toggle `isLoggedIn` to true; the Header then shows a "Profile" button with a placeholder image (e.g., `/profile-placeholder.png`).
- [x] **UI/UX Improvements for Header:**
  - [x] Enhance typography with consistent fonts and sizes.
  - [x] Link login button to login page (`/auth/login`)
  - [x] Add registration button linking to registration page (`/auth/register`)
  - [x] Update mobile menu to include both login and registration options
  - [x] Add profile button when logged in, linking to profile page (`/profile`)
  - [x] Hide login button when on login page
  - [x] Hide registration button when on registration page
  - [x] Optimize navigation performance using Next.js `Link` component
  - [x] Hide Features, How It Works, Pricing, and Blog links on blog pages
  - [x] Keep login/register buttons visible on blog pages when not logged in
  - [x] Show profile button on blog pages when logged in
  - [x] Ensure proper button variants are used (default and primary)

### 1.6 Refine the Hero Component

- [x] Confirm the Hero section displays the main title ("Your Personal Knowledge Hub for Real-Time Explanations"), subtitle, and two CTA buttons ("Install Extension" and "Learn More") rendered via `CustomButton`.
- [x] Verify the hero image (`hero.webp`) loads correctly.
- [x] Test responsiveness:  
  *Expected State:* Layout stacks vertically on mobile and switches to a side-by-side layout on desktop.
- [x] **UI/UX Improvements for Hero:**
  - [x] Improve typography and spacing for consistency.

### 1.7 Implement the Features Component

- [x] Validate the live demo section:  
  *Data:* Demo GIF (`demo.gif`) is displayed in a "mock-browser" container styled with Tailwind (borders, rounded corners, shadow).
- [x] Validate the features list section:  
  *Data:* List items for features like "Real-Time Explanations", "Wide Topic Coverage", etc., each prefixed with a check mark (✓) and descriptive text.
- [x] Test layout responsiveness:  
  *Expected State:* Proper display on both mobile and desktop devices.
- [x] **UI/UX Improvements for Features:**
  - [x] Enhance typography and spacing.

### 1.8 Implement the Case Studies Component

- [x] Render three case study cards using the `Card` component:  
  *Data:* Cards for "Academia", "Business", "Personal Learning" display images (`academin.png`, `business.png`, `learning.png`), titles, and descriptions.
- [x] Ensure grid layout responsiveness:  
  *Expected State:* Single column on mobile; three columns on desktop.
- [x] Test hover effects on cards:  
  *Expected State:* Cards display subtle animations on hover.
- [x] **UI/UX Improvements for Case Studies:**
  - [x] Enhance typography for titles and descriptions.

### 1.9 Implement the Blog Component

- [x] Render blog posts using the provided `posts` array:  
  *Data/Expected State:* Each post displays:
  - Title (e.g., "How SimpliSense Enhances Learning for Students")
  - Truncated description (using line-clamp for 3 lines)
  - Date (e.g., "January 15, 2025") with proper `datetime`
  - Category tag rendered with the `Tag` component (e.g., "Education")
  - Author info (name, role, image from `/images/authors/...`)
- [x] Test internal navigation links:  
  *Expected State:* Links for categories, post titles, and author profiles work as expected.
- [x] Verify responsive grid layout:  
  *Expected State:* Adjusts to one column on mobile and three columns on desktop.
- [x] **UI/UX Improvements for Blog:**
  - [x] Improve typography for readability and consistency.

---

## 2. Additional Tasks for Blog Functionality

- [x] **Move Post Data to a Separate File**
  - [x] Create a new `data/posts.ts` file
  - [x] Remove inline post data from `blog.tsx`
  - [x] Import the `posts` array from `data/posts.ts` into `blog.tsx`

- [x] **Create a Blog Details Page**
  - [x] Implement a dynamic route (`[id]`) for the blog post details
  - [x] Fetch the correct post by ID and display its `details` content
  - [x] Handle a missing post gracefully by showing a 404 page or message
  - [x] Integrate the same `Header` component used throughout the site to ensure consistent site-wide navigation

- [x] **Create a Custom 404 Page**
  - [x] Create a friendly and helpful 404 page (e.g., `404.tsx` or `app/not-found.tsx`)
  - [x] Add a relevant or humorous image (in `public` or `assets` folder) to ease frustration
  - [x] Provide links that help users return to the main site (e.g., a "Go Home" button)
  - [x] Style the page to match the overall brand (color scheme, fonts, etc.)

## 3. New Tasks for Custom Blog Content Rendering

These tasks replace the current raw HTML in the `details` property with structured data and a custom component for rendering.

- [x] **Extract and Convert HTML to Structured Data** 
  - Parse the existing `details` HTML for each post and convert blocks (headings, paragraphs, lists, etc.) into a structured JSON array with attributes (e.g., `{ type: "heading", level: 1, text: "Title" }`, `{ type: "paragraph", text: "..." }`, `{ type: "list", items: ["item 1", "item 2"] }`).

- [x] **Sanitize and Remove Raw HTML Markup**
  - Remove the HTML tags from the `details` payload and replace them with the structured attributes that your custom component will use for rendering.

- [x] **Embed Structured Data in the Post Model** 
  - Update the `Post` interface to include a new property (e.g., `content: BlogBlock[]`) that holds the structured data. Deprecate or remove the old `details` string once migration is complete.

- [x] **Create a Custom Rendering Component**  
  - Build a React component (e.g., `BlogContent.tsx`) that iterates over the structured data and renders each block appropriately using TailwindCSS classes (for example, `<h1 className="text-3xl font-bold">`, `<p className="mb-4">`, `<ul className="list-disc pl-5">`, etc.).

- [x] **Validate Tailwind Styling for Blog Content**
  - Ensure that all rendered elements (headings, paragraphs, lists) display correctly in both light and dark modes, matching the site's typography and spacing standards.

- [x] **Integration of Reusable Controls:**  
  - [x] Replace existing native UI elements (buttons, links, form inputs, tags, cards) across the application with these reusable components.
  - [x] Validate that each control is imported from the controls folder and renders correctly on all pages (Header, Blog, Pricing, etc.) in both light and dark themes.

---

## 4. Pricing Component

- [x] **Implement the Pricing Component**
  - [x] Display two pricing cards (Free and Premium) using the `Card` component:
    - *Data:*
      - **Free Plan:**  
        - Price: "Free"  
        - Usage Limits: 3 daily explanations and up to 15 explanations per month.  
        - Description: "Perfect for casual learners."  
        - Features: "Access to basic topics", "Limited to 3 daily explanations", "Standard LLM integration."
      - **Premium Plan:**  
        - Price: "R9.99/month"  
        - Usage Limits: 150 explanations per month (subject to a fair use policy).  
        - Description: "Best for professionals and students."  
        - Features: "High-quality, enhanced explanations", "Access to premium LLMs", "Advanced interactive features."
    - *UI Highlight:* Emphasize the Premium plan with distinctive styling (e.g., blue border, emphasized typography).
  - [x] Simulate CTA button interactions using `CustomButton`:
    - *Step Detail:* On click, log dummy actions or open a modal indicating a subscription flow.
  - [x] **UI/UX Improvements for Pricing:**
    - [x] Enhance typography for plan details (consistent fonts, sizes, weights).
    - [x] Consider interactive pricing elements (e.g., hover animations, transitions when selecting a plan).
    - [x] **Validation:** Ensure that all pricing buttons and controls are imported from the controls folder (e.g., `CustomButton`).

---

## 5. Develop User Authentication and Registration Flow

- [x] **Implement Login Functionality (Email, Google, GitHub)**
  - [x] Create a login page with a form using `InputField` components for Email and Password.
    - *Data/Expected State:* Error messages appear for invalid or empty inputs.
  - [x] Integrate OAuth via simulated authentication:
    - *Data/Expected State:* Configure providers for Email, Google, and GitHub; test each authentication flow.

- [x] **Implement User Registration Flow**
  - [x] Develop a registration page with fields for Name, Email, and Password using `InputField` components.
    - *Data/Expected State:* Proper validation and error handling; on successful registration, auto-login the user and redirect to the Profile Management page.

- [x] **Implement Profile Management Page**
  - [x] Create a profile page that displays editable user details (name, email, profile picture) using `InputField` components.
    - *Data/Expected State:* Users can update their profile information; changes are reflected in the UI.
  - [x] Add logout functionality:
    - *Step Detail:* Clear user session and redirect to home page.
  - [x] Add usage statistics display:
    - *Data/Expected State:* Show usage stats (e.g., "12/15 explanations used").
  - [x] **UI/UX Improvements:**
    - [x] Ensure consistent styling with the rest of the application
    - [x] Add proper validation and error handling
    - [x] Implement loading states for form submissions
    - [x] Add accessibility labels to interactive elements
    - [x] Remove unused state setters
    - [x] Fix TypeScript errors in component props

---

## 6. Implement Real-Time Chat History and Explanation Streaming

- [ ] **Develop Chat History Screen**
  - [ ] Create a dedicated chat component with a scrollable container (e.g., `overflow-y-auto`, fixed height).
  - [ ] Initialize an array of sample messages, each with text, timestamp, and sender info.
  - [ ] Map over the array to display each message in a styled block using TailwindCSS.

- [ ] **Simulate Sending & Receiving Messages**
  - [ ] Add a text input and a "Send" or "Simulate" button that appends new messages to the array.
  - [ ] Optionally, use `useEffect` with `setInterval` to simulate periodic incoming messages.

- [ ] **Auto-Scroll & UX Validation**
  - [ ] Implement auto-scroll to the latest message on new message arrival (using a `ref`).
  - [ ] Verify responsiveness on mobile vs. desktop, ensuring the chat container behaves correctly.
  - [ ] Improve typography and spacing for readability.

---

## 7. Implement Subscription Management and Monetization (Using PayPal)

- [x] **Subscription Management Dashboard**
  - [x] Create a dashboard section displaying current subscription status and usage counters.
  - [x] Provide controls for upgrading, downgrading, or canceling subscriptions.
  - [x] Add confirmation modals for critical actions.
  - [x] Implement multiple subscription tiers (Basic and Premium).

- [x] **PayPal Integration Setup**
  - [x] Create a PayPal developer account and configure sandbox credentials.
  - [x] Install and set up the PayPal SDK in the project.
  - [x] Implement PayPal checkout flow for subscription payments.
  - [x] Add loading states for PayPal buttons.
  - [x] Implement error handling for failed payments.
  - [x] Create PayPalProviderWrapper component to manage PayPal context.
  - [x] Fix TypeScript errors in PayPal integration.

- [x] **Dynamic Upgrade Prompts**
  - [x] Implement a prompt that triggers when usage exceeds a defined threshold.
  - [x] Test by toggling simulated usage to verify the prompt displays as expected.

- [x] **Email Notifications**
  - [x] Add email notifications for subscription changes (upgrade, downgrade, cancellation).

- [ ] **UI/UX Improvements for Subscription Management**
  - [ ] Enhance typography for usage details and PayPal payment buttons.
  - [ ] Provide clear messaging around subscription tiers and how to upgrade or downgrade.

---

## 8. Develop Analytics and Reporting Dashboard

- [x] **Create an Analytics Section**
  - [x] Render dummy charts (e.g., bar charts for daily usage, line graphs for monthly trends) using sample data.
    - *Data/Expected State:* Daily usage chart shows values from 0 to 20; monthly trend chart displays a set of dummy data points.
  - [x] Implement interactive filters for different time ranges (daily, weekly, monthly) that update the displayed charts.
    - *Step Detail:* Simulate filter selections and verify that the chart data updates accordingly.

- [x] **UI/UX Improvements for Analytics**
  - [x] Enhance typography for chart labels and legends.
  - [x] Ensure responsive design for both mobile and desktop views.

## 9. Implement Analytics Screen

- [x] **Create Analytics Page**
  - [x] Add analytics charts and filters
  - [x] Link analytics page from header navigation
  - [x] Ensure proper routing and navigation

