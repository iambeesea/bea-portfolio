import { sendContactMessage } from '@/app/actions/contact';
import { PortfolioExperience } from '@/components/experience/PortfolioExperience';
import { JsonLd } from '@/components/seo/JsonLd';
import { getPortfolioContent } from '@/lib/content';
import { site } from '@/lib/site';

// Rendered on the server and cached; content edited in Supabase appears
// within five minutes without a redeploy.
export const revalidate = 300;

export default async function HomePage() {
  const content = await getPortfolioContent();

  return (
    <>
      <JsonLd projects={content.projects} />
      <main className="h-full">
        <PortfolioExperience content={content} email={site.email} sendMessage={sendContactMessage} />
      </main>
    </>
  );
}
