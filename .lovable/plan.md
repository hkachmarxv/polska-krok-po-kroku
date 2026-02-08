
# LearnPolski -- Expert Brand & UX Review

## Overall Assessment: Strong Foundation, Room for Excellence

The site is well-built with clean code, good component structure, and a clear conversion funnel. But as a northstar experience, there are meaningful improvements that would take it from "good" to "premium product people trust with their money."

---

## Issues Found & Recommended Changes

### 1. WhyUs Comparison Table -- Too One-Sided, Hurts Credibility
**Problem**: Every single row shows LearnPolski = check, Others = X. This looks fabricated. No product is better at *everything*. Duolingo has gamification; Babbel has conversation practice. A table where you win 7/7 feels dishonest and actually *reduces* trust.

**Fix**: Make it 5-6 rows where you win on 4-5 that actually matter (Polish-specific curriculum, case/declension drills, AI grammar explanations, affordable pricing). Give competitors a check on 1-2 generic things (e.g. "Available on mobile app" or "Gamification badges"). This makes the comparison *believable* and your wins more impactful.

---

### 2. Social Proof Stats Are Unverified / Could Feel Fake
**Problem**: "500+ Active Learners", "4.9 User Rating" in the hero. If these aren't real, they're a liability. If they *are* real, they're not backed by anything.

**Fix**: Either (a) connect these to real data, (b) remove the specific numbers and use qualitative proof instead ("Loved by Polish learners worldwide"), or (c) keep them but add a subtle source like "Based on user feedback" underneath.

---

### 3. Testimonials Feel Generic / Potentially AI-Generated
**Problem**: Three 5-star reviews from "Sarah M., London", "James K., Chicago", "Anna T., Berlin" with no photos, no links, no verification. Savvy visitors will suspect these are fabricated.

**Fix**: 
- Add avatar photos (even stock photos help, but real is best)
- If you have real users, use their actual words
- Add a subtle detail like "Using LearnPolski for 3 months" to make them feel real
- Consider adding a "Verified User" badge

---

### 4. Landing Page Is Too Long -- 11 Sections Creates Fatigue
**Problem**: Hero > WhyUs > Method (6 cards) > VocabPreview > Roadmap > Pricing > Poland (6 cards) > Testimonials > FinalCTA > Contact > Footer. That's a LOT of scrolling. The "Poland" section and "Method" section both have 6 cards each -- it's repetitive structurally.

**Fix**: 
- Merge "Why Us" and "Method" into a single, punchier section (comparison table + 3 best method highlights, not 6)
- Move "Discover Poland" content to a blog post or separate page -- it's interesting but doesn't drive conversions
- This cuts the page to ~8 sections, which is the sweet spot

---

### 5. Pricing Section -- "AI Grammar Assistant (5 uses/day)" Contradicts Landing Page
**Problem**: The in-app Pricing page says "AI Grammar Assistant (5 uses/day)" and "AI Grammar Drill (5 uses/day)", but the landing page PricingSection says "(unlimited)". This is a direct contradiction that erodes trust.

**Fix**: Align the copy. Either they're unlimited or they're not. Pick one and make it consistent everywhere.

---

### 6. No Privacy Policy or Terms of Service
**Problem**: The auth page says "By continuing, you agree to our terms of service" but there's no link. The footer has no Privacy Policy link. This is a legal requirement for any product collecting emails and processing payments.

**Fix**: Add Privacy Policy and Terms of Service pages (even simple ones) and link them from both the auth page and the footer.

---

### 7. Hero CTA Says "No signup required to explore" -- But Where?
**Problem**: Below the CTA button it says "No signup required to explore" but clicking "Start Learning Free" goes to /auth (signup page). There's no way to explore without signing up.

**Fix**: Either (a) remove that line, or (b) add a secondary "Explore Lessons" button that shows a preview of Lesson 1 content without requiring auth. Option (a) is simpler and more honest.

---

### 8. Footer Is Too Thin -- Missing Expected Links
**Problem**: The footer only has Contact link and a copyright notice. For a paid product, users expect: About, Privacy Policy, Terms, Contact, and possibly social links.

**Fix**: Add at minimum: Privacy Policy, Terms of Service, and a link back to Pricing.

---

### 9. Nav "Why Polish" Label Is Confusing
**Problem**: The nav link "Why Polish" scrolls to the Poland section, but users might think this is about "why learn Polish" vs. "why use our app." The section is titled "Discover Poland & why Polish is worth it" which is different from what the nav says.

**Fix**: Rename nav link to "Discover Poland" to match the section.

---

### 10. Mobile: Vocab Preview Tabs Could Overflow
**Problem**: Three tab buttons ("Greetings", "Essentials", "At a Cafe") are in a horizontal row. On very small screens (320px), these could get cramped.

**Fix**: Add `flex-wrap` or use a horizontal scroll container for the tab row.

---

### 11. In-App Pricing Page Has "AI Grammar Assistant (5 uses/day)" but Memory Says Unlimited
**Problem**: Your project memory says "AI Grammar Assistant and Drill features... are provided without artificial daily limits" but the Pricing page lists "5 uses/day". This needs to be resolved -- is there a limit or not?

**Fix**: Decide the actual policy and update all pricing copy to match.

---

### 12. Contact Form Has No Rate Limiting Indicator
**Minor**: The contact form submits to an edge function but there's no indication of rate limiting to prevent spam. Not visible to users, but worth noting.

---

## Priority Order for Implementation

1. **Fix the pricing copy contradiction** (unlimited vs 5/day) -- this is the most damaging to trust
2. **Remove "No signup required to explore"** or make it true
3. **Add Privacy Policy + Terms of Service** pages and links
4. **Improve the WhyUs comparison table** -- make it credible
5. **Enhance testimonials** with photos/details or mark as illustrative
6. **Trim the page length** -- merge or reduce sections
7. **Fix footer** with proper links
8. **Rename "Why Polish" nav link**
9. **Mobile vocab tab overflow fix**

## Summary

The bones are excellent -- clean design, good typography, solid component architecture, proper auth flow, well-structured course. The issues are mostly about **trust signals** and **copy consistency** -- things that directly impact whether a visitor converts to a paying customer. Fix the contradictions first, add the legal pages, and tighten the social proof, and this becomes a genuinely premium product.
