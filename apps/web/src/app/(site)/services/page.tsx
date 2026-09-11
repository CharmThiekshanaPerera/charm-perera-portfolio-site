import { permanentRedirect } from "next/navigation";

/**
 * Freelance packages are no longer shown publicly (see /start for the
 * project-intake flow that replaced them). This route stays as a 308 rather
 * than disappearing outright, since it was already indexed by Search Console.
 */
export default function ServicesPage(): never {
  permanentRedirect("/start");
}
