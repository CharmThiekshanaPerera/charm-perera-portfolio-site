import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { whatsappLink } from "@/lib/format";

/** Floating contact affordance. Static markup — no JavaScript needed. */
export function WhatsAppButton({ number }: { number: string }) {
  if (!number) return null;

  return (
    <a
      href={whatsappLink(number, "Hi Charm, I would like to discuss a project.")}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-6 right-6 z-40"
      aria-label="Chat on WhatsApp"
    >
      <span className="relative block">
        <span
          className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20"
          aria-hidden="true"
        />
        <span className="relative block rounded-full bg-[#25D366] p-4 text-white shadow-2xl transition-all duration-300 hover:scale-110">
          <WhatsAppIcon className="h-7 w-7" />
        </span>
        <span className="pointer-events-none absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-lg bg-[#25D366] px-4 py-2 text-sm font-medium text-white opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
          Chat on WhatsApp
        </span>
      </span>
    </a>
  );
}
