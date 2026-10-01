import styles from "./home.module.css";

type Part = string | { text: string; href: string };

export function RichText({ parts }: { parts: readonly Part[] }) {
  return parts.map((part, index) =>
    typeof part === "string" ? (
      <span key={index}>{part}</span>
    ) : (
      <a key={index} href={part.href} className={styles.textLink} rel="noreferrer">
        {part.text}
      </a>
    ),
  );
}
