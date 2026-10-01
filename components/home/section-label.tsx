import styles from "./home.module.css";

export function SectionLabel({
  index,
  title,
  aside,
  tone = "light",
  heading = false,
  headingId,
}: {
  index: string;
  title: string;
  aside?: string;
  tone?: "light" | "dark";
  heading?: boolean;
  headingId?: string;
}) {
  const labelClass = tone === "dark" ? `${styles.label} ${styles.labelOnDark}` : styles.label;
  const asideClass = tone === "dark" ? `${styles.aside} ${styles.asideOnDark}` : styles.aside;
  const rowClass = tone === "dark" ? `${styles.labelRow} ${styles.labelRowDark}` : styles.labelRow;
  const text = `${index} — ${title}`;

  return (
    <div className={rowClass}>
      {heading ? (
        <h2 id={headingId} className={labelClass}>
          {text}
        </h2>
      ) : (
        <p className={labelClass}>{text}</p>
      )}
      {aside ? <p className={asideClass}>{aside}</p> : null}
    </div>
  );
}
