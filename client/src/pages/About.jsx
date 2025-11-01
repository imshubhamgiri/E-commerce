import React from 'react'
import { FiCheckCircle, FiUsers, FiTruck, FiShield } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <main className="text-gray-800 antialiased">
      {/* Hero / Banner */}
      <section className="relative">
        <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1650&q=80" alt="About banner" className="w-full h-64 md:h-96 object-cover" />
        <div className="absolute inset-0 bg-linear-to-r from-black/40 via-black/62 to-black/30 flex items-center">
          <div className="container mx-auto px-6 md:px-12 text-white">
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">About Our Marketplace</h1>
            <p className="mt-3 max-w-2xl text-sm md:text-base lg:text-lg opacity-90">
              Curated, conscientious and customer-first — we bring premium products from trusted makers to your doorstep.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <img src="https://media.giphy.com/media/3o6Zt6ML6BklcajjsA/giphy.gif" alt="shopping animation" className="w-16 h-16 md:w-20 md:h-20 rounded-lg shadow-lg" />
              <div>
                <p className="text-sm md:text-base">Fast, friendly shopping backed by human support.</p>
                <p className="text-xs md:text-sm opacity-80">Free returns • Secure payments • Same-week dispatch on popular items</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="container mx-auto px-6 md:px-12 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Who We Are</h2>
            <p className="mb-4">
              Founded with a simple idea — make exceptional products discoverable and shopping delightful — our company combines thoughtful curation,
              rigorous quality standards, and technology that keeps the experience effortless. We work directly with independent makers and established
              brands to bring you an edited collection across home, lifestyle, fashion and electronics.
            </p>
            <p className="mb-4">
              Over the years we've grown into a community of customers and partners who value quality, transparency and service. Our small but dedicated
              operations team ensures orders are packed with care and delivered reliably.
            </p>
            <p className="text-sm text-gray-600">Headquarters: Chicago, IL • Founded: 2018 • Employees: 75+</p>
          </div>

          <div className="rounded-lg overflow-hidden shadow-lg bg-white">
            <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1650&q=80" alt="Our team" className="w-full h-72 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold">Our Team</h3>
              <p className="text-sm text-gray-600 mt-2">
                A mix of product lovers, logistics experts and customer champions — we obsess over small details that make shopping better.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values & Commitments */}
      <section className="bg-gray-50 py-10">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Our Values</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-start gap-4">
              <FiCheckCircle className="text-indigo-600 text-3xl" />
              <h4 className="font-semibold">Quality First</h4>
              <p className="text-sm text-gray-600">We vet every product and partner to ensure long-lasting value.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-start gap-4">
              <FiUsers className="text-teal-500 text-3xl" />
              <h4 className="font-semibold">Customer Centric</h4>
              <p className="text-sm text-gray-600">Support that listens — human help when you need it, fast and kind.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-start gap-4">
              <FiTruck className="text-orange-500 text-3xl" />
              <h4 className="font-semibold">Reliable Delivery</h4>
              <p className="text-sm text-gray-600">Clear timelines, careful packing and tracking from pick-up to doorstep.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-start gap-4">
              <FiShield className="text-purple-600 text-3xl" />
              <h4 className="font-semibold">Trust & Safety</h4>
              <p className="text-sm text-gray-600">Secure payments and transparent policies so you can shop with confidence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact / Sustainability */}
      <section className="container mx-auto px-6 md:px-12 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Sustainability & Community</h2>
            <p className="mb-4">
              We prioritize partners that minimize waste and use responsible materials. Whenever possible we opt for carbon-conscious shipping and
              support initiatives that give back to local communities.
            </p>
            <ul className="list-disc ml-5 space-y-2 text-sm text-gray-700">
              <li>Partnered with certified small makers and B-Corp brands</li>
              <li>Packaging reduction targets and recyclable materials</li>
              <li>Monthly donations to community-driven causes</li>
            </ul>
          </div>

          <div className="rounded-lg overflow-hidden shadow-lg">
            <img src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1650&q=80" alt="Sustainability" className="w-full h-72 object-cover" />
          </div>
        </div>
      </section>

      {/* Stats / Quick Facts */}
      <section className="bg-indigo-700 text-white py-10">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold">50k+</div>
            <div className="text-sm opacity-90">Happy customers</div>
          </div>
          <div>
            <div className="text-3xl font-bold">1k+</div>
            <div className="text-sm opacity-90">Curated products</div>
          </div>
          <div>
            <div className="text-3xl font-bold">4.9/5</div>
            <div className="text-sm opacity-90">Average rating</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 md:px-12 py-12">
        <div className="bg-linear-to-r from-indigo-50 to-white rounded-lg p-8 flex flex-col md:flex-row items-center gap-6 shadow-md">
          <div className="flex-1">
            <h3 className="text-xl font-semibold">Explore our collection</h3>
            <p className="text-sm text-gray-700 mt-2">Handpicked items and regular drops — join our newsletter for exclusive previews.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/product" className="bg-indigo-600 text-white px-5 py-3 rounded-md shadow hover:bg-indigo-700">Shop Now</Link>
            <Link to="/contact" className="text-indigo-600 px-4 py-2 border border-indigo-200 rounded-md">Contact Us</Link>
          </div>
        </div>
      </section>

      {/* Footer note */}
      <footer className="bg-gray-100 py-6 text-sm text-center text-gray-600">
        © {new Date().getFullYear()} Our Marketplace — Built on a promise of quality, fairness and delightful service.
      </footer>
    </main>
  )
}

export default About

