export const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/**
 * Ref callback that sets an inline `transition` with !important.
 * Our global reduced-motion rule turns transitions off; this keeps the key UI motions (cart drawer,
 * accordions) working for everyone, including people whose OS asks for less motion.
 */
export const forceTransition = (value: string) => (el: (Element & ElementCSSInlineStyle) | null) => {
  if (el) el.style.setProperty("transition", value, "important");
};
