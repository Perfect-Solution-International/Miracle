import { Button } from "@/components/ui/button";

/**
 * 5. Final CTA Section
 * Clean light container with exact heading and button without images or dark backgrounds.
 */
export function TellUsWhatYouNeedFinalCta() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-page">
        <div className="max-w-4xl mx-auto rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 lg:p-14 text-center shadow-soft">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy tracking-tight">
            Have Something Specific in Mind?
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            Whether it is custom product sourcing, private travel itineraries, visa assistance, or enterprise business solutions, our team is ready to assist you.
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              asChild
              size="lg"
              className="bg-brand-blue hover:bg-brand-blue-dark h-11 sm:h-12 rounded-full px-8 text-sm font-bold text-white shadow-lg shadow-brand-blue/20 transition-all hover:shadow-xl"
            >
              <a href="#requirement-form">
                Tell Us What You Need
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
