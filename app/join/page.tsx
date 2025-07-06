import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

export default function JoinPage() {
  return (
    <div className="flex flex-col min-h-screen bg-charcoal text-offwhite">
      <Header />

      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-teal font-heading">Join DSC @ WMU</h1>
          <p className="text-xl mb-8">
            Thank you for your interest in joining Data Science Club! We&apos;re super excited to get you started on the process for joining the club.
          </p>

          <div className="space-y-12">
            {/* Step 1 */}
            <div className="p-6 rounded-lg bg-charcoal/50 backdrop-filter backdrop-blur-md shadow-lg border border-teal/20 hover:border-teal/30 transition-all">
              <div className="flex items-center mb-4">
                <div className="bg-teal text-charcoal rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">1</div>
                <h2 className="text-2xl font-bold text-teal">Submit Membership Interest Form</h2>
              </div>
              <p className="mb-4">
                Our membership form is going to be the fastest way for us to reach you with the latest information
                about the club and our events. This also adds you to our Teams group where most of our communication happens.
              </p>
              <div className="mt-4">
                <a 
                  href="#" 
                  className="inline-block px-6 py-3 bg-teal text-charcoal rounded-md font-bold hover:bg-teal/80 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Interest Form
                </a>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-lg bg-charcoal/50 backdrop-filter backdrop-blur-md shadow-lg border border-violet/20 hover:border-violet/30 transition-all">
              <div className="flex items-center mb-4">
                <div className="bg-violet text-charcoal rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">2</div>
                <h2 className="text-2xl font-bold text-violet">(Optional) Attend Kick-Off Event</h2>
              </div>
              <p className="mb-4">
                DSC hosts a kick-off event at the beginning of each semester. Join us to learn more about our club, 
                what we do, and the available projects. You&apos;ll also have the opportunity to ask questions you may have about joining.
              </p>
              <p className="mb-4">
                Don&apos;t worry if you can&apos;t make it - all the information will be available online afterward.
              </p>
              <div className="mt-4 flex flex-wrap gap-4">
                <a 
                  href="#" 
                  className="inline-block px-6 py-3 bg-violet/20 text-offwhite rounded-md font-bold hover:bg-violet/30 transition-colors border border-violet/40"
                >
                  Event Details
                </a>
                <a 
                  href="#" 
                  className="inline-block px-6 py-3 bg-violet/20 text-offwhite rounded-md font-bold hover:bg-violet/30 transition-colors border border-violet/40"
                >
                  Kick-Off Slides
                </a>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-lg bg-charcoal/50 backdrop-filter backdrop-blur-md shadow-lg border border-teal/20 hover:border-teal/30 transition-all">
              <div className="flex items-center mb-4">
                <div className="bg-teal text-charcoal rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">3</div>
                <h2 className="text-2xl font-bold text-teal">Complete GitHub Learning Repo</h2>
              </div>
              <p className="mb-4">
                New members are required to complete a set of tutorials giving an introduction to data science 
                and programming in Python. The purpose of these tutorials is to make sure that all of our members, 
                despite their background, are able to equally contribute to DSC projects.
              </p>
              <p className="mb-4">
                The tutorials contain all the materials and instructions you need to learn data science basics 
                like Python and NumPy, as well as information about the support we provide if you have any questions.
              </p>
              <div className="mt-4">
                <a 
                  href="https://github.com/Data-Science-Club-at-WMU" 
                  className="inline-block px-6 py-3 bg-teal text-charcoal rounded-md font-bold hover:bg-teal/80 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tutorial Repository
                </a>
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-lg bg-charcoal/50 backdrop-filter backdrop-blur-md shadow-lg border border-violet/20 hover:border-violet/30 transition-all">
              <div className="flex items-center mb-4">
                <div className="bg-violet text-charcoal rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">4</div>
                <h2 className="text-2xl font-bold text-violet">Submit GitHub Learning Repo</h2>
              </div>
              <p className="mb-4">
                As a final step to join the club, you must submit your completed tutorial work certifying that 
                you&apos;ve completed the fundamental requirements to join the club.
              </p>
              <p className="mb-4">
                This proves you are ready and know the basics before joining one of our research projects. 
                If your submission is incomplete, you may attempt the tutorials again and resubmit.
              </p>
              <div className="mt-4">
                <a 
                  href="#" 
                  className="inline-block px-6 py-3 bg-violet/20 text-offwhite rounded-md font-bold hover:bg-violet/30 transition-colors border border-violet/40"
                >
                  Submission Form
                </a>
              </div>
            </div>

            {/* Step 5 */}
            <div className="p-6 rounded-lg bg-charcoal/50 backdrop-filter backdrop-blur-md shadow-lg border border-teal/20 hover:border-teal/30 transition-all">
              <div className="flex items-center mb-4">
                <div className="bg-teal text-charcoal rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">5</div>
                <h2 className="text-2xl font-bold text-teal">Meet With Project Leads</h2>
              </div>
              <p className="mb-4">
                Meet with project leads at a weekly workshop and get onboarded onto a project. This is where 
                the real fun begins! You&apos;ll join one of our ongoing research projects based on your interests 
                and skill level.
              </p>
              <p className="mb-4">
                Our project leads will help you get started and provide the support you need to contribute effectively.
              </p>
              <div className="mt-4 flex flex-wrap gap-4">
                <a 
                  href="#" 
                  className="inline-block px-6 py-3 bg-teal/20 text-offwhite rounded-md font-bold hover:bg-teal/30 transition-colors border border-teal/40"
                >
                  Workshop Schedule
                </a>
                <a 
                  href="/projects" 
                  className="inline-block px-6 py-3 bg-teal text-charcoal rounded-md font-bold hover:bg-teal/80 transition-colors"
                >
                  View Projects
                </a>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-6 text-teal font-heading">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2 text-violet">Do I need prior experience?</h3>
                <p>No prior experience is required! Our tutorials are designed to teach you the basics, and we welcome members of all skill levels.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-2 text-violet">How much time commitment is expected?</h3>
                <p>We recommend dedicating 3-5 hours per week to club activities, including project work and learning.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-2 text-violet">Can I join mid-semester?</h3>
                <p>Yes! While it&apos;s ideal to join at the beginning of the semester, we accept new members throughout the year.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-2 text-violet">How do I get help with the tutorials?</h3>
                <p>We have dedicated channels in our Teams group where you can ask questions and get help from experienced members.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
