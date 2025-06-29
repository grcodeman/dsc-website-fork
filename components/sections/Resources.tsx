import React from 'react';

const Resources = () => {
  return (
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
  );
};

export default Resources;
