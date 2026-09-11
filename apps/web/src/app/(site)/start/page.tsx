import type { Metadata } from "next";
import { ProjectInquiryForm } from "@/components/site/project-inquiry-form";
import { getSiteSettings, getSiteUrl } from "@/lib/content";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  const title = `Start a Project — ${settings.fullName}`;
  const description = `Tell ${settings.fullName} about your web or mobile project and get a scope, timeline and quote.`;

  return {
    title,
    description,
    alternates: { canonical: "/start" },
    openGraph: { title, description, url: "/start", type: "website" },
  };
}

export default async function StartPage() {
  const settings = await getSiteSettings();
  const siteUrl = getSiteUrl(settings);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Start a Project", url: "/start" },
            ],
            siteUrl,
          ),
        ]}
      />

      <div className="pt-20">
        <section className="container mx-auto px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-2xl">
            <div className="mb-10 text-center">
              <h1 className="mb-4 text-3xl font-bold sm:text-4xl">
                Start a <span className="text-gradient">Project</span>
              </h1>
              <p className="text-muted-foreground">
                Share a few details about what you are building and I will get back to you with a
                scope, timeline and quote — usually within a day.
              </p>
            </div>

            <ProjectInquiryForm whatsapp={settings.whatsapp} />
          </div>
        </section>
      </div>
    </>
  );
}
