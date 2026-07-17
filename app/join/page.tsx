import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Link from "next/link";
import { FaArrowCircleRight, FaCalendarAlt, FaGithub } from "react-icons/fa";

export const metadata = {
  title: "Join | Data Science & AI Club at WMU",
  description: "Join the Data Science & AI Club at Western Michigan University — one form and you're in",
};

const MEMBERSHIP_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfBu3lEXavOT56VEP1xvJxf1wb1bobRm3m6jlqJNqFPTSee-g/viewform";

export default function JoinPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-ink font-heading">Join DSAIC @ WMU</h1>
          <p className="text-xl mb-8 text-ink/75">
            Joining the Data Science &amp; AI Club takes one step — fill out the membership form and you&apos;re in.
            All majors and skill levels are welcome.
          </p>

          {/* The one and only step */}
          <div className="p-8 rounded-xl bg-white shadow-[0_8px_24px_-12px_rgba(37,25,122,0.18)] border border-violet/25">
            <h2 className="text-2xl font-bold text-ink mb-4 mt-0">Fill Out the Membership Form</h2>
            <p className="mb-6 text-ink/75">
              Take a minute to get added to our membership list. You&apos;ll be added to our
              Microsoft Teams, where all announcements, updates, and event details are shared.
            </p>
            <a
              href={MEMBERSHIP_FORM_URL}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-violet hover:bg-ink text-white rounded-lg font-bold text-lg hover:scale-105 shadow-[0_8px_24px_-8px_rgba(114,67,193,0.6)] transition-all duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="flex items-center gap-2">
                Sign Up <FaArrowCircleRight className="text-xl group-hover:translate-x-1.5 transition-transform" />
              </span>
            </a>
          </div>

          {/* Optional next steps */}
          <h2 className="text-2xl font-bold text-ink mt-14 mb-6 font-heading">While You&apos;re Here</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-white shadow-[0_8px_24px_-12px_rgba(37,25,122,0.18)] border border-lavender hover:border-violet/40 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <FaCalendarAlt className="text-violet text-xl" />
                <h3 className="text-xl font-bold text-ink my-0">Come to an Event</h3>
              </div>
              <p className="mb-4 text-ink/75">
                Meet us in person! Stop by our table at Bronco Bash on September 1, or come
                to Info Night on September 2 at Parkview D-109.
              </p>
              <Link
                href="/calendar"
                className="inline-block px-5 py-2.5 bg-violet/10 text-violet rounded-md font-bold hover:bg-violet hover:text-white transition-all duration-300 border border-violet/30"
              >
                See the Calendar
              </Link>
            </div>

            <div className="p-6 rounded-xl bg-white shadow-[0_8px_24px_-12px_rgba(37,25,122,0.18)] border border-lavender hover:border-violet/40 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <FaGithub className="text-violet text-xl" />
                <h3 className="text-xl font-bold text-ink my-0">Explore Our Resources</h3>
              </div>
              <p className="mb-4 text-ink/75">
                Want a head start? Our GitHub tutorials cover Python, data science, and
                machine learning basics — totally optional, self-paced learning.
              </p>
              <Link
                href="/#resources"
                className="inline-block px-5 py-2.5 bg-violet/10 text-violet rounded-md font-bold hover:bg-violet hover:text-white transition-all duration-300 border border-violet/30"
              >
                View Resources
              </Link>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-6 text-ink font-heading">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2 text-violet">Do I need prior experience?</h3>
                <p className="text-ink/75">No prior experience is required! We welcome members of all skill levels and majors.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2 text-violet">How much time commitment is expected?</h3>
                <p className="text-ink/75">As much or as little as you like. Many members drop into our weekly building sessions, but there are no attendance requirements.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2 text-violet">Can I join mid-semester?</h3>
                <p className="text-ink/75">Yes! While it&apos;s ideal to join at the beginning of the semester, we accept new members throughout the year.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2 text-violet">How do I get involved after joining?</h3>
                <p className="text-ink/75">Keep an eye on our Microsoft Teams for announcements, and come to our weekly building sessions held jointly with Developer Club — it&apos;s the best way to meet people and start working on something real.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
