import { useEffect } from "react";

function useDynamicTitle(title) {
  useEffect(() => {
    document.title = `Bistro | ${title}`;
  }, [title]);
}

export default useDynamicTitle;
