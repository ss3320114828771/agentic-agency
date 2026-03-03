export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
        About Agentic AI
      </h1>

      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-8 space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Our Mission
          </h2>
          <p className="text-white/90 leading-relaxed">
            At Agentic AI, we're revolutionizing the way businesses leverage artificial intelligence and web development. 
            Our mission is to provide cutting-edge solutions that empower businesses to thrive in the digital age.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Who We Are
          </h2>
          <p className="text-white/90 leading-relaxed">
            Founded by Hafiz Sajid Syed, a visionary in AI and web technologies, we bring together expertise, 
            innovation, and dedication to deliver exceptional digital solutions. Our team combines deep technical 
            knowledge with creative problem-solving to address the unique challenges of modern businesses.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            Administrator Information
          </h2>
          <div className="bg-white/5 rounded-lg p-6">
            <p className="text-white font-semibold">Hafiz Sajid Syed</p>
            <p className="text-gray-300">Email: sajid.syed@example.com</p>
            <p className="text-gray-300 mt-2">
              With years of experience in AI development and web technologies, Hafiz Sajid Syed leads our team 
              with passion and expertise, ensuring every project meets the highest standards of quality and innovation.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
            Our Values
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Innovation First',
              'Customer Success',
              'Quality Excellence',
              'Ethical AI',
              'Continuous Learning',
              'Community Focus'
            ].map((value) => (
              <li key={value} className="bg-white/5 rounded-lg p-3 text-white/90 text-center">
                {value}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}