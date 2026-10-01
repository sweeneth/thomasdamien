export function Icon({ name }: { name: "github" | "x" | "mail" | "linkedin" }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className: "size-[1.15rem]",
  };

  if (name === "github") {
    return (
      <svg {...common}>
        <path d="M9 19c-4 1.5-4-2.5-6-3m12 5v-3.9a3.4 3.4 0 0 0-.9-2.6c3 0 6-1.8 6-5.1a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 3.3 3 5.1 6 5.1a3.4 3.4 0 0 0-.9 2.6V21" />
      </svg>
    );
  }

  if (name === "x") {
    return (
      <svg {...common} fill="currentColor" stroke="none">
        <path d="M14.7 10.3 21.4 3h-1.6l-5.8 6.4L9.2 3H3.2l7 9.9L3.2 21h1.6l6.2-6.8L14.8 21h6l-6.1-10.7Zm-2.2 2.4-.7-1-5.7-8h2.4l4.6 6.4.7 1 6 8.4h-2.4l-4.9-6.8Z" />
      </svg>
    );
  }

  if (name === "mail") {
    return (
      <svg {...common}>
        <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    );
  }

  return (
    <svg {...common} fill="currentColor" stroke="none">
      <path d="M6.5 9.5H4V20h2.5V9.5ZM5.2 4A1.6 1.6 0 1 0 5.2 7.2 1.6 1.6 0 0 0 5.2 4ZM20 20h-2.5v-5.6c0-1.6-.6-2.6-2-2.6-1 0-1.6.7-1.9 1.4-.1.2-.1.6-.1.9V20H11V9.5h2.4v1.4c.4-.7 1.3-1.7 3.2-1.7 2.3 0 4 1.5 4 4.8V20Z" />
    </svg>
  );
}
