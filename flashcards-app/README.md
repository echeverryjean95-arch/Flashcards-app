# Flashcards

A small, responsive flashcards app built with HTML, CSS, and vanilla JavaScript. It supports deck and card management, browser storage, search, and a keyboard-accessible study mode.

## AI-assisted development notes



## Reflection
- **Where AI saved time:** 

AI significantly accelerated the initial setup by rapidly generating the CSS Grid layout, responsive styles with CSS variables, and the baseline HTML structure for the single-page application.


- **AI bug identified and fixed:** The AI initially kept the `.is-flipped` card state active when navigating to the next or previous card. I fixed this bug by adding a state reset function that removes the flip class whenever the active card index changes.


- **Code snippet refactored for clarity:** Refactored the LocalStorage load/save logic to include a `try/catch` safety fallback, breaking it into cleaner, modular helper functions rather than having inline JSON parsing chaos.


- **Accessibility improvement added:** Added proper keyboard accessibility with visible focus outlines (`focus-visible`), aria labels on buttons, and ensured semantic structure across the sidebar and main study area.


- **Prompt changes that improved output:** Explicitly instructing the AI to use vanilla JavaScript event delegation and asking it to avoid duplicate event listeners drastically reduced memory leaks and broken event bindings.