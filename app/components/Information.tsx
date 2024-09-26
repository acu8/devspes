import Image from "next/image";

const companies = [
  { name: "databricks", logo: "/placeholder.svg" },
  { name: "Super.com", logo: "/placeholder.svg" },
  { name: "duolingo", logo: "/placeholder.svg" },
  { name: "reddit", logo: "/placeholder.svg" },
  { name: "greenhouse", logo: "/placeholder.svg" },
  { name: "instacart", logo: "/placeholder.svg" },
  { name: "rubrik", logo: "/placeholder.svg" },
  { name: "samsara", logo: "/placeholder.svg" },
  { name: "landshake", logo: "/placeholder.svg" },
  { name: "LaunchDarkly", logo: "/placeholder.svg" },
  { name: "Gainsight", logo: "/placeholder.svg" },
  { name: "grammarly", logo: "/placeholder.svg" },
  { name: "bill", logo: "/placeholder.svg" },
  { name: "pinterest", logo: "/placeholder.svg" },
  { name: "Redis", logo: "/placeholder.svg" },
  { name: "BOLT", logo: "/placeholder.svg" },
];

const features = [
  {
    title: "Find & understand information",
    color: "text-blue-600",
    items: [
      { title: "Search", description: "information, docs, and people" },
      { title: "Explore", description: "insights, research, and discoveries" },
      { title: "Onboard", description: "to new jobs and projects" },
    ],
  },
  {
    title: "Create & summarize content",
    color: "text-purple-600",
    items: [
      { title: "Create", description: "content, updates and deliverables" },
      { title: "Summarize", description: "docs, threads and meetings" },
      { title: "Analyze", description: "for insights and answers" },
    ],
  },
  {
    title: "Automate work",
    color: "text-green-600",
    items: [
      { title: "Communicate", description: "with automatic responses" },
      { title: "Automate", description: "repetitive tasks and workflows" },
      { title: "Orchestrate", description: "departmental processes" },
    ],
  },
];

export default function Information() {
  return (
    <div className="h-[900px] bg-[#ffffff] py-16 px-2 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl font-bold text-center text-gray-900 mb-14">
          Let's work with Learn Hub.
        </h1>
        {/* <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 mb-16">
          {companies.map((company) => (
            <div
              key={company.name}
              className="flex items-center justify-center"
            >
              <Image
                src={company.logo}
                alt={company.name}
                width={100}
                height={40}
                className="max-h-8 w-auto"
              />
            </div>
          ))}
        </div> */}
        <div className="h-[500px] grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-[#f8f8ff] rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300"
            >
              <h2 className={`text-2xl font-semibold mb-4 ${feature.color}`}>
                {feature.title}
              </h2>
              <ul className="space-y-4">
                {feature.items.map((item) => (
                  <li key={item.title}>
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <p className="text-gray-500">{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
