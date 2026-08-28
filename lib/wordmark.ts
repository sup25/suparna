/**
 * Geometry for the oversized footer wordmark, kept out of the client component
 * so the server-rendered footer can reserve space for a mark it never renders
 * itself. Pure string maths, no React.
 */

/**
 * Size is derived from letter count rather than fixed, so the mark bleeds past
 * both edges whatever the word is. 190vw of total width over N letters lands a
 * 7-letter mark on the 27vw that was tuned by hand; a shorter word scales up to
 * fill the same span instead of shrinking into the middle of the page.
 */
export const wordmarkSize = (text: string) =>
  `clamp(5.5rem, ${(190 / [...text].length).toFixed(1)}vw, 26rem)`;

/**
 * How much of the mark the page bottom eats. This is a fraction of the mark's
 * own size, not of the footer: as a percentage offset it resolved against the
 * footer's height, and the footer is roughly twice as tall on a phone
 * (everything stacks), so mobile lost about a third of the mark below the fold
 * while desktop lost a sliver.
 */
export const wordmarkCrop = (text: string) =>
  `calc(${wordmarkSize(text)} * -0.05)`;

/**
 * Height of the band the mark occupies once cropped: the 0.72 line box, less
 * the 5% the page bottom eats. The footer reserves this much beneath its
 * content so the mark closes the page in clear space of its own.
 *
 * Overlapping it with the copyright row was the earlier approach and it was the
 * wrong one. Scrimming the row back to legibility meant painting over the
 * densest part of the mark, and the scrim lived inside `.container` while the
 * mark is full-bleed, so the section gutters stayed uncovered and leaked the
 * outer letters through as disconnected fragments.
 */
export const wordmarkBand = (text: string) =>
  `calc(${wordmarkSize(text)} * 0.67)`;
