const Features = () => {
  const features = [
    {
      title: "Engagement Analysis",
      description: "Deep dive into retention curves and audience drop-off points to understand exactly when and why viewers lose interest.",
      image: "/placeholder.svg"
    },
    {
      title: "Timing Optimization",
      description: "Discover optimal posting times based on your audience's activity patterns and platform-specific engagement windows.",
      image: "/placeholder.svg"
    },
    {
      title: "Content Structure Insights",
      description: "AI-powered analysis of hooks, pacing, CTAs, and content flow to identify structural improvements.",
      image: "/placeholder.svg"
    },
    {
      title: "Cross-Platform Repurposing",
      description: "Automatically generate LinkedIn posts, Twitter threads, and Instagram content from your existing videos.",
      image: "/placeholder.svg"
    },
    {
      title: "Lead Generation Workflows",
      description: "Transform underperforming content into lead magnets with suggested CTAs and outreach strategies.",
      image: "/placeholder.svg"
    }
  ];

  return (
    <section id="features" className="py-24 px-10 mb-12 mx-4 rounded-xl bg-white">
      <div className="mx-auto px-6 flex flex-row justify-between items-start gap-16">
        {/* Fixed Side Text */}
        <div className="sticky top-24 w-1/3 flex-shrink-0">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-2 h-2 bg-[#210F06] rounded-full"></div>
            <span className="text-lg font-light text-gray-500">Features</span>
          </div>
          <h2 className="text-4xl tracking-tight font-bold mb-6">
            Everything you need to{" "}
            <span className="bg-gray-400 bg-clip-text text-transparent tracking-tight">
              optimize your content
            </span>
          </h2>
          <p className="text-base text-gray-600 leading-relaxed">
            From diagnosis to remediation, Crux provides the complete toolkit for content optimization
          </p>
        </div>

        {/* Scrollable Bento Grid */}
        <div className="w-2/3 flex-shrink-0 p-5">
          <div className="grid grid-cols-1 gap-4 ">
            <div className="col-span-2 grid grid-cols-2 gap-4">

              {/* Row 1: 2 cards */}
              <div className="col-1  hover:shadow-xl transition-all duration-300 cursor-hover rounded-2xl p-4 overflow-hidden bg-gray-50">
                <div className="flex items-center justify-center">
                  <img src="https://framerusercontent.com/images/JhWyLtXNg2kGDvd8m0rDfqUaeZM.png?scale-down-to=1024" alt="Engagement Analysis" className="object-cover rounded-lg" />
                </div>

                <div className="mt-3">
                  <h3 className="text-lg font-bold mb-1">{features[0].title}</h3>
                  <p className="text-gray-500 text-base">
                    {features[0].description}
                  </p>
                </div>
              </div>

              <div className="col-1  hover:shadow-xl transition-all duration-300 cursor-hover rounded-2xl p-4 overflow-hidden bg-gray-50">
                <div className="flex items-center justify-center">
                  <img src="https://framerusercontent.com/images/XP8RYCxAWOUg9fELbDA4spkutwo.png?scale-down-to=1024" alt="Timing Optimization" className="object-cover rounded-lg" />
                </div>
                <div className="mt-3">
                  <h3 className="text-lg font-bold mb-1">{features[1].title}</h3>
                  <p className="text-gray-500 text-base">
                    {features[1].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Row 2: 1 card (centered) */}
            <div className="col-span-1 w-full  hover:shadow-xl transition-all duration-300 cursor-hover rounded-2xl p-4 overflow-hidden bg-gray-50">
              <div className="flex items-center justify-center mb-3">
                <img src="https://framerusercontent.com/images/PInac8xWP70hjZOKddSLlXohpqk.png?scale-down-to=2048" alt="Content Structure Insights" className=" object-cover rounded-lg" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{features[2].title}</h3>
                <p className="text-gray-500 leading-relaxed text-base">
                  {features[2].description}
                </p>
              </div>
            </div>


          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
