import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-charcoal text-offwhite">
      {/* Navigation - simple placeholder */}
      <header className="sticky top-0 z-10 w-full bg-charcoal/90 backdrop-blur-sm border-b border-violet/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="font-heading text-xl tracking-widest text-teal">DSC</div>
          <nav className="hidden md:flex space-x-6">
            <a href="#about" className="hover:text-teal transition-colors">About</a>
            <a href="#events" className="hover:text-teal transition-colors">Events</a>
            <a href="#resources" className="hover:text-teal transition-colors">Resources</a>
            <a href="#team" className="hover:text-teal transition-colors">Team</a>
          </nav>
          <button className="md:hidden text-offwhite">Menu</button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="min-h-[80vh] flex items-center justify-center">
          <div className="container mx-auto px-4 py-16 flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-heading tracking-widest mb-6 uppercase text-teal">
              Data Science Club
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mb-8">
              Exploring the frontier of Data Science and AI
            </p>
            <button className="bg-teal text-charcoal font-heading px-8 py-3 rounded-md hover:bg-teal/80 transition-colors uppercase tracking-widest">
              Join Us
            </button>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 bg-charcoal/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading tracking-widest mb-12 text-center uppercase text-violet">
              About Us
            </h2>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 bg-charcoal/30 p-8 rounded-lg border border-teal/20">
                <h3 className="text-xl font-heading mb-4 text-teal">Our Mission</h3>
                <p className="text-offwhite/80">Mission description placeholder text goes here.</p>
              </div>
              <div className="flex-1 bg-charcoal/30 p-8 rounded-lg border border-teal/20">
                <h3 className="text-xl font-heading mb-4 text-teal">What We Do</h3>
                <p className="text-offwhite/80">What we do placeholder text goes here.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Events Timeline */}
        <section id="events" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading tracking-widest mb-12 text-center uppercase text-violet">
              Events Timeline
            </h2>
            <div className="relative max-w-3xl mx-auto">
              {/* Timeline Line */}
              <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-teal/50"></div>
              
              {/* Timeline Items */}
              <div className="flex flex-col space-y-8">
                {/* Event 1 */}
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="md:w-1/2 pl-12 md:pl-0 md:pr-12 relative">
                    <div className="absolute left-0 md:left-auto md:right-0 rounded-full w-8 h-8 bg-teal"></div>
                    <div className="md:text-right">
                      <h3 className="text-xl font-heading text-teal">Workshop Title</h3>
                      <p className="text-violet">June 15, 2025</p>
                      <p className="text-offwhite/80 mt-2">Event description placeholder.</p>
                    </div>
                  </div>
                  <div className="hidden md:block md:w-1/2"></div>
                </div>
                
                {/* Event 2 */}
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="hidden md:block md:w-1/2"></div>
                  <div className="md:w-1/2 pl-12 relative">
                    <div className="absolute left-0 md:left-0 rounded-full w-8 h-8 bg-violet"></div>
                    <div>
                      <h3 className="text-xl font-heading text-teal">Hackathon</h3>
                      <p className="text-violet">July 10-12, 2025</p>
                      <p className="text-offwhite/80 mt-2">Event description placeholder.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Resources Grid */}
        <section id="resources" className="py-16 bg-charcoal/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading tracking-widest mb-12 text-center uppercase text-violet">
              Resources
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Resource Card 1 */}
              <div className="bg-charcoal/30 p-6 rounded-lg border border-teal/20 hover:border-teal transition-colors">
                <h3 className="text-xl font-heading mb-3 text-teal">Resource Title 1</h3>
                <p className="text-offwhite/80 mb-4">Description of resource.</p>
                <a href="#" className="text-violet hover:text-teal transition-colors inline-flex items-center">
                  Learn More <span className="ml-2">→</span>
                </a>
              </div>
              
              {/* Resource Card 2 */}
              <div className="bg-charcoal/30 p-6 rounded-lg border border-teal/20 hover:border-teal transition-colors">
                <h3 className="text-xl font-heading mb-3 text-teal">Resource Title 2</h3>
                <p className="text-offwhite/80 mb-4">Description of resource.</p>
                <a href="#" className="text-violet hover:text-teal transition-colors inline-flex items-center">
                  Learn More <span className="ml-2">→</span>
                </a>
              </div>
              
              {/* Resource Card 3 */}
              <div className="bg-charcoal/30 p-6 rounded-lg border border-teal/20 hover:border-teal transition-colors">
                <h3 className="text-xl font-heading mb-3 text-teal">Resource Title 3</h3>
                <p className="text-offwhite/80 mb-4">Description of resource.</p>
                <a href="#" className="text-violet hover:text-teal transition-colors inline-flex items-center">
                  Learn More <span className="ml-2">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading tracking-widest mb-12 text-center uppercase text-violet">
              Our Team
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Team Member 1 */}
              <div className="text-center">
                <div className="w-40 h-40 rounded-full bg-teal/20 mx-auto mb-4"></div>
                <h3 className="text-xl font-heading text-teal">Name</h3>
                <p className="text-violet">Position</p>
              </div>
              
              {/* Team Member 2 */}
              <div className="text-center">
                <div className="w-40 h-40 rounded-full bg-teal/20 mx-auto mb-4"></div>
                <h3 className="text-xl font-heading text-teal">Name</h3>
                <p className="text-violet">Position</p>
              </div>
              
              {/* Team Member 3 */}
              <div className="text-center">
                <div className="w-40 h-40 rounded-full bg-teal/20 mx-auto mb-4"></div>
                <h3 className="text-xl font-heading text-teal">Name</h3>
                <p className="text-violet">Position</p>
              </div>
              
              {/* Team Member 4 */}
              <div className="text-center">
                <div className="w-40 h-40 rounded-full bg-teal/20 mx-auto mb-4"></div>
                <h3 className="text-xl font-heading text-teal">Name</h3>
                <p className="text-violet">Position</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-12 bg-charcoal/90 border-t border-violet/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-heading mb-4 text-teal tracking-widest">DSC</h3>
              <p className="text-offwhite/80">Short description about the club.</p>
            </div>
            <div>
              <h3 className="text-xl font-heading mb-4 text-teal">Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-offwhite/80 hover:text-teal transition-colors">About</a></li>
                <li><a href="#" className="text-offwhite/80 hover:text-teal transition-colors">Events</a></li>
                <li><a href="#" className="text-offwhite/80 hover:text-teal transition-colors">Resources</a></li>
                <li><a href="#" className="text-offwhite/80 hover:text-teal transition-colors">Team</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-heading mb-4 text-teal">Connect</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-offwhite hover:text-teal transition-colors">Twitter</a>
                <a href="#" className="text-offwhite hover:text-teal transition-colors">GitHub</a>
                <a href="#" className="text-offwhite hover:text-teal transition-colors">Discord</a>
              </div>
            </div>
          </div>
          <div className="border-t border-violet/10 mt-8 pt-8 text-center text-offwhite/60">
            <p>© {new Date().getFullYear()} Developer Student Club. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
