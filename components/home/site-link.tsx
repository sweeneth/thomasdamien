import type { ComponentProps } from "react";

type SiteLinkProps = ComponentProps<"a"> & { href: string };

function isSamePage(href: string) {
  return href.startsWith("#") || href.startsWith("/") || href.startsWith("?");
}

export function SiteLink({ href, children, ...props }: SiteLinkProps) {
  if (isSamePage(href)) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} {...props} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
