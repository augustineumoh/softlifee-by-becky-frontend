import { motion } from 'framer-motion'

export default function CategoryPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <p className="text-sage-dark text-xs tracking-widest uppercase mb-6">
            New Collection — 2025
          </p>
          <h1 className="font-display text-7xl font-light text-charcoal leading-none">
            Live <em className="italic text-clay">softly,</em>
            <br />live well.
          </h1>
          <p className="mt-6 text-charcoal/60 font-light max-w-md mx-auto">
            Curated essentials for your home, skin, and everyday ritual.
          </p>
          <button className="mt-10 bg-charcoal text-cream px-10 py-4 text-xs
            tracking-widest uppercase hover:bg-clay transition-colors duration-300">
            Shop Now
          </button>
        </div>
      </section>
    </motion.div>
  )
}
