# SimpliSense Website Implementation Checklist

Below is the updated, comprehensive markdown numbered checklist for one complete story point task for the Website folder of the SimpliSense project. This checklist covers every feature of the web application—from environment setup, static content verification, navigation fixes with smooth scrolling, and dynamic features (authentication, chat history, subscription management, analytics), to refactoring and reusing reusable UI controls (with dark theme support) from the "controls" folder. It also includes robust UI/UX improvements such as enhanced typography, consistent styling, engaging effects, and Framer Motion integration for smooth animations. **For every control, ensure that styling, effects, and typography are maintained consistently.** Completed tasks are marked with [x] and pending tasks with [ ].

> **Project Structure:**  
>
> - **SimpliSense**  
>   - **Backend**  
>   - **Browser_Extension**  
>   - **Website** (this is your working folder)

---

1. **Integrate and Enhance All Web Application Features in the Website Folder**

   - [x] **Environment Setup and Validation**
     - [x] Verify the Next.js app runs with `npm run dev` in the Website folder without errors.  
       *Expected State:* The index page renders Header, Hero, Features, CaseStudies, Blog, Pricing, and Footer correctly.
     - [x] Run `npm run build` to confirm there are no TypeScript or bundling errors.  
       *Expected Data:* Successful build output with no warnings or errors.
     - [x] **Install Framer Motion:**  
         - [x] Run `npm install framer-motion` to add Framer Motion to the project.  
           *Expected State:* Framer Motion is added to `package.json` and is available for animations.

   - [x] **Run the Project Before Reviewing Components**
     - [x] Execute `npm run dev` and verify that the application starts and displays the index page.  
       *Expected State:* The application loads in the browser without errors before proceeding to component-specific tasks.

   - [ ] **Refactor and Integrate Reusable UI Controls in the Controls Folder**
     - [x] **Establish a "controls" Folder**
         - [x] Create a dedicated `controls` folder within the project structure to house all reusable UI components.
     - [x] **CustomButton Component**
         - [x] Create `CustomButton.tsx` supporting variants: `primary`, `danger`, `default`, etc.
             - *Data/Expected State:* Renders correctly for each variant; verifies hover, active, and disabled states; supports dark theme (e.g., `dark:bg-blue-700` for primary).
         - [x] **Validation:** Ensure that all buttons across the project are imported from this `CustomButton` component.
         - [x] **UI/UX Requirements:** Maintain consistent styling, effects, and typography.
     - [ ] **NavLink Component**
         - [ ] Create `NavLink.tsx` for anchor-based navigation links with smooth scrolling.
             - *Expected State:* Renders with provided `href` and label; supports hover and active states in both light and dark themes.
         - [ ] **Validation:** Confirm that Header navigation links use this `NavLink` component.
         - [ ] **UI/UX Requirements:** Maintain consistent styling, effects, and typography.
     - [ ] **InputField Component**
         - [ ] Develop `InputField.tsx` for form inputs with built-in validation and error styling.
             - *Data/Expected State:* Renders input fields for types such as text, email, and password; displays error state (e.g., red border) when validation fails; supports dark mode.
         - [ ] **Validation:** Ensure that login, registration, and profile forms import `InputField` from the controls folder.
         - [ ] **UI/UX Requirements:** Maintain consistent styling, effects, and typography.
     - [ ] **Tag Component**
         - [ ] Create `Tag.tsx` for displaying category tags.
             - *Expected State:* Renders a tag with a label (e.g., "Education"); optionally wraps in an anchor if `href` is provided; styled for both light and dark themes.
         - [ ] **Validation:** Confirm that blog posts use the `Tag` component for category tags.
         - [ ] **UI/UX Requirements:** Maintain consistent styling, effects, and typography.
     - [ ] **Card Component**
         - [ ] Develop `Card.tsx` for case studies and blog previews.
             - *Data/Expected State:* Accepts title, image, and description; renders with consistent padding, border, and shadow; supports dark mode.
         - [ ] **Validation:** Verify that Case Studies and Blog components import and use the `Card` component.
         - [ ] **UI/UX Requirements:** Maintain consistent styling, effects, and typography.
     - [ ] **Modal Component (Optional)**
         - [ ] Create `Modal.tsx` for displaying prompts or feedback.
             - *Expected State:* Renders with an overlay and centered content; supports closing functionality; styled appropriately for both light and dark themes.
         - [ ] **UI/UX Requirements:** Maintain consistent styling, effects, and typography.
     - [ ] **Integration of Reusable Controls:**
         - [ ] Replace existing native UI elements (buttons, links, form inputs, tags, cards) across the application with these reusable components.
         - [ ] Validate that each control is imported from the controls folder and renders correctly on all pages (Header, Blog, Pricing, etc.) in both light and dark themes.

   - [x] **Fix and Test Navigation Links with Smooth Scrolling**
     - [x] Add unique IDs to index page sections:  
       *Data:* `<section id="features">`, `<section id="how-it-works">`, `<section id="pricing">`, `<section id="blog">`.
     - [x] Update the Header navigation links to use anchor tags:  
       *Expected State:* Navigation link for "Features" becomes `<a href="#features">Features</a>`, and clicking it scrolls to the section with `id="features"`.
     - [x] Enable smooth scrolling by adding `scroll-behavior: smooth;` in global CSS (or Tailwind configuration on the `html` element).
     - [x] Implement Scroll to Top functionality by creating a ScrollToTop component that appears on scroll and returns the page to the top when clicked.
     - [x] Test navigation:  
       *Expected State:* Each link smoothly scrolls to its corresponding section, and the Scroll to Top button functions correctly.

   - [x] **Enhance the Header Component**
     - [x] Verify the Header displays the logo (from `simpliSense.png`), navigation links (using the new `NavLink` component with anchors), and a "Login" button.
     - [x] Simulate logged-out state:  
       *Expected State:* "Login" button is visible.
     - [x] Simulate logged-in state:  
       *Step Detail:* Toggle `isLoggedIn` to true; the Header then shows a "Profile" button with a placeholder image (e.g., `/profile-placeholder.png`).
     - [ ] **UI/UX Improvements for Header:**
         - [ ] Add Framer Motion animations for transitions and hover effects.
         - [ ] Enhance typography with consistent fonts and sizes.
         - [ ] Apply an alternating background (e.g., light gray for this section).

   - [x] **Refine the Hero Component**
     - [x] Confirm the Hero section displays the main title ("Your Personal Knowledge Hub for Real-Time Explanations"), subtitle, and two CTA buttons ("Install Extension" and "Learn More") rendered via `CustomButton`.
     - [x] Verify the hero image (`hero.webp`) loads correctly.
     - [x] Test responsiveness:  
       *Expected State:* Layout stacks vertically on mobile and switches to a side-by-side layout on desktop.
     - [ ] **UI/UX Improvements for Hero:**
         - [ ] Integrate Framer Motion for animated content entrances.
         - [ ] Improve typography and spacing for consistency.
         - [ ] Apply an alternating background color (e.g., white for Hero).

   - [x] **Implement the Features Component**
     - [x] Validate the live demo section:  
       *Data:* Demo GIF (`demo.gif`) is displayed in a "mock-browser" container styled with Tailwind (borders, rounded corners, shadow).
     - [x] Validate the features list section:  
       *Data:* List items for features like "Real-Time Explanations", "Wide Topic Coverage", etc., each prefixed with a check mark (✓) and descriptive text.
     - [x] Test layout responsiveness:  
       *Expected State:* Proper display on both mobile and desktop devices.
     - [ ] **UI/UX Improvements for Features:**
         - [ ] Add Framer Motion effects for feature item animations.
         - [ ] Enhance typography and spacing.
         - [ ] Use an alternating background (e.g., light gray for this section).

   - [x] **Implement the Case Studies Component**
     - [x] Render three case study cards using the `Card` component:  
       *Data:* Cards for "Academia", "Business", "Personal Learning" display images (`academia.png`, `business.png`, `learning.png`), titles, and descriptions.
     - [x] Ensure grid layout responsiveness:  
       *Expected State:* Single column on mobile; three columns on desktop.
     - [x] Test hover effects on cards:  
       *Expected State:* Cards display subtle animations on hover.
     - [ ] **UI/UX Improvements for Case Studies:**
         - [ ] Add Framer Motion hover animations.
         - [ ] Enhance typography for titles and descriptions.
         - [ ] Apply an alternating background color (e.g., white for this section).

   - [x] **Implement the Blog Component**
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
     - [ ] **UI/UX Improvements for Blog:**
         - [ ] Integrate Framer Motion for post hover effects and transitions.
         - [ ] Improve typography for readability and consistency.
         - [ ] Implement an alternating background pattern (e.g., alternating white and light gray).

   - [ ] **Implement the Pricing Component**
     - [ ] Display two pricing cards (Free and Premium) using the `Card` component:
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
     - [ ] Simulate CTA button interactions using `CustomButton`:  
         - *Step Detail:* On click, log dummy actions or open a modal indicating a subscription flow.
     - [ ] **UI/UX Improvements for Pricing:**
         - [ ] Add Framer Motion animations for card transitions.
         - [ ] Enhance typography for plan details (consistent fonts, sizes, weights).
         - [ ] Apply an alternating background (e.g., light gray for this section) ensuring each pricing card is visually distinct.
         - [ ] Consider interactive pricing elements (e.g., hover animations, transitions when selecting a plan).
         - [ ] **Validation:** Ensure that all pricing buttons and controls are imported from the controls folder (e.g., `CustomButton`).

   - [ ] **Develop User Authentication and Registration Flow**
     - [ ] **Implement Login Functionality (Email, Google, GitHub)**
         - [ ] Create a login page with a form using `InputField` components for Email and Password.
           - *Data/Expected State:* Error messages appear for invalid or empty inputs.
         - [ ] Integrate OAuth via NextAuth.js:
           - *Data/Expected State:* Configure providers for Email, Google, and GitHub; test each authentication flow.
     - [ ] **Implement User Registration Flow**
         - [ ] Develop a registration page with fields for Name, Email, and Password using `InputField` components.
           - *Data/Expected State:* Proper validation and error handling; on successful registration, auto-login the user and redirect to the Profile Management page.
     - [ ] **Implement Profile Management Page**
         - [ ] Create a profile page that displays editable user details (name, email, profile picture) using `InputField` components and `CustomButton` for "Save" and "Cancel" actions.
           - *Data/Expected State:* Placeholder user data is displayed; updates simulate profile changes.
     - [ ] **UI/UX Improvements for Authentication:**
         - [ ] Use Framer Motion for form transitions and interactive feedback.
         - [ ] Enhance typography and input styling for consistency.
         - [ ] Apply alternating background colors (e.g., white for login, light gray for registration).
         - [ ] **Validation:** Ensure all form controls are imported from the controls folder.

   - [ ] **Implement Real-Time Chat History and Explanation Streaming**
     - [ ] Develop a simulated Chat History component that renders a list of dummy explanation messages with timestamps.
         - *Data/Expected State:* Use an array of sample messages; messages appear in chronological order.
     - [ ] Add a "Simulate New Message" button to dynamically append new messages.
         - *Expected State:* New messages appear smoothly, mimicking a live chat interface.
     - [ ] **UI/UX Improvements for Chat:**
         - [ ] Integrate Framer Motion for smooth message transitions.
         - [ ] Improve typography and spacing within chat messages.
         - [ ] Apply alternating background colors (e.g., white and light gray) for different messages.

   - [ ] **Implement Subscription Management and Monetization**
     - [ ] **Subscription Management Dashboard**
         - [ ] Create a dashboard section displaying current subscription status and usage counters.
             - *Data/Expected State:* Dummy data (e.g., "15 out of 20 explanations used") simulates usage metrics.
         - [ ] Provide controls for upgrading, downgrading, or canceling subscriptions using `CustomButton`.
             - *Step Detail:* Simulate these actions with console logs or modal displays.
     - [ ] **Dynamic Upgrade Prompts**
         - [ ] Implement a prompt that triggers when usage exceeds a defined threshold.
             - *Data/Expected State:* Example message: "You've used 80% of your monthly quota. Upgrade now for unlimited access!" is displayed.
         - [ ] Test by toggling simulated usage to verify the prompt displays as expected.
     - [ ] **UI/UX Improvements for Subscription Management:**
         - [ ] Add Framer Motion animations for dashboard transitions and upgrade prompt appearance.
         - [ ] Enhance typography for usage details.
         - [ ] Apply alternating background patterns (e.g., white for the dashboard, light gray for prompts).

   - [ ] **Develop Analytics and Reporting Dashboard**
     - [ ] Create an analytics section to visualize user behavior and usage patterns.
         - [ ] Render dummy charts (e.g., bar charts for daily usage, line graphs for monthly trends) using sample data.
             - *Data/Expected State:* Daily usage chart shows values from 0 to 20; monthly trend chart displays a set of dummy data points.
         - [ ] Implement interactive filters for different time ranges (daily, weekly, monthly) that update the displayed charts.
             - *Step Detail:* Simulate filter selections and verify that the chart data updates accordingly.
     - [ ] **UI/UX Improvements for Analytics:**
         - [ ] Integrate Framer Motion for animated chart transitions and filter interactions.
         - [ ] Enhance typography for chart labels and legends.
         - [ ] Apply alternating background colors (e.g., white and light gray) for different chart sections.

---