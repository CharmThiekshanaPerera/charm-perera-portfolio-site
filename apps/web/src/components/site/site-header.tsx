"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@charm/ui/button";
import { Switch } from "@charm/ui/switch";
import { cn } from "@charm/ui/cn";

/**
 * Every nav item is now a real route rather than a hash fragment. The old SPA
 * had exactly one indexable URL; these are six distinct pages that can each
 * rank and be linked to.
 */
const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Start a Project", href: "/start" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader({ initials }: { initials: string }) {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Theme is unknown until after hydration; render the toggle only once mounted
  // so the server and client markup match.
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(!(currentScrollY > lastScrollY && currentScrollY > 100));
      setIsScrolled(currentScrollY > 50);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the mobile drawer whenever the route changes.
  useEffect(() => setIsMobileMenuOpen(false), [pathname]);

  const isDark = resolvedTheme === "dark";

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        isScrolled
          ? "border-b border-border bg-background/80 shadow-lg backdrop-blur-lg"
          : "bg-transparent",
        isVisible ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between sm:h-20">
          <Link
            href="/"
            className="text-gradient text-xl font-bold transition-transform hover:scale-105 sm:text-2xl"
            aria-label="Home"
          >
            {initials}
          </Link>

          <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "group relative font-medium transition-colors hover:text-primary",
                  isActive(link.href) ? "text-primary" : "text-foreground/80",
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300",
                    isActive(link.href) ? "w-full" : "w-0 group-hover:w-full",
                  )}
                />
              </Link>
            ))}

            {mounted ? (
              <div className="flex items-center gap-2 border-l border-border pl-4">
                <Sun className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <Switch
                  checked={isDark}
                  onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                  aria-label="Toggle dark mode"
                />
                <Moon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              </div>
            ) : (
              <div className="w-[86px] border-l border-border pl-4" aria-hidden="true" />
            )}

            <Button asChild>
              <Link href="/start">Hire Me</Link>
            </Button>
          </nav>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="rounded-lg p-2 transition-colors hover:bg-primary/10 md:hidden"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen ? (
        <div
          id="mobile-menu"
          className="animate-fade-in border-t border-border bg-background/95 backdrop-blur-lg md:hidden"
        >
          <nav className="container mx-auto space-y-4 px-6 py-6" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block py-2 font-medium transition-colors hover:text-primary",
                  isActive(link.href) ? "text-primary" : "text-foreground/80",
                )}
              >
                {link.label}
              </Link>
            ))}

            {mounted ? (
              <div className="flex items-center justify-between border-t border-border py-2">
                <span className="font-medium text-foreground/80">Dark mode</span>
                <div className="flex items-center gap-2">
                  <Sun className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <Switch
                    checked={isDark}
                    onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                    aria-label="Toggle dark mode"
                  />
                  <Moon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                </div>
              </div>
            ) : null}

            <Button asChild className="w-full">
              <Link href="/start">Hire Me</Link>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
