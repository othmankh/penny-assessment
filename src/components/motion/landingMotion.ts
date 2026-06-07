const landingTransition = { duration: 1, ease: "easeOut" as const };

export const slideFromLeftMotion = {
  initial: { opacity: 0, x: -48 },
  animate: { opacity: 1, x: 0 },
  transition: landingTransition,
};

export const slideFromRightMotion = {
  initial: { opacity: 0, x: 48 },
  animate: { opacity: 1, x: 0 },
  transition: landingTransition,
};
