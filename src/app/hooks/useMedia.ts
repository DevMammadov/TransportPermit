import { useMediaQuery } from "react-responsive";

export const useMedia = () => {
  return {
    isMobile: useMediaQuery({ query: "(max-width: 640px)" }),
  };
};
