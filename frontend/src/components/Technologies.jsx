
const technologies = [
  { title: 'Mobile Tracking', description: 'Manage projects on-the-go with our iOS and Android apps.' },
  { title: 'Expense Dashboards', description: 'Visualize costs with real-time graphs and reports.' },
  { title: 'Supplier Network', description: 'Compare prices and connect with nearby suppliers.' },
];

const Technologies = () => {
  return (
    <section id="technologies" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Building New Technologies</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {technologies.map((tech, index) => (
            <div key={index} className="p-6 bg-gray-100 rounded shadow">
              <h3 className="text-xl font-semibold mb-2">{tech.title}</h3>
              <p>{tech.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technologies;
