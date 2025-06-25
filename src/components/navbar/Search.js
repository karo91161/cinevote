import { useRef } from "react";
import { useKey } from "../common/useKey";

export default function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  // using my custom hook here to handle key action globally, added a longer action param to it
  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) {
      return;
    }
    inputEl.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
