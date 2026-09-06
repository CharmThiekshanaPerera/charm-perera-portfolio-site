"use client";

import { useEffect, useState } from "react";

/**
 * Decorative typewriter for the hero.
 *
 * The first role is rendered on the server as static text so the heading area
 * is never empty for a crawler or a user with JavaScript disabled; this only
 * animates once hydrated.
 */
export function RoleTyper({ roles }: { roles: string[] }) {
  const [text, setText] = useState(roles[0] ?? "");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (roles.length === 0) return;

    // Honour the OS reduced-motion setting: show the first role and stop.
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const current = roles[roleIndex % roles.length] ?? "";
    const isComplete = !isDeleting && text === current;
    const isCleared = isDeleting && text === "";

    if (isComplete) {
      const pause = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(pause);
    }

    if (isCleared) {
      setIsDeleting(false);
      setRoleIndex((index) => index + 1);
      return;
    }

    const timer = setTimeout(
      () => {
        setText((previous) =>
          isDeleting
            ? current.substring(0, previous.length - 1)
            : current.substring(0, previous.length + 1),
        );
      },
      isDeleting ? 50 : 120,
    );

    return () => clearTimeout(timer);
  }, [text, isDeleting, roleIndex, roles]);

  return (
    <>
      {text}
      <span className="animate-pulse text-primary" aria-hidden="true">
        |
      </span>
    </>
  );
}
