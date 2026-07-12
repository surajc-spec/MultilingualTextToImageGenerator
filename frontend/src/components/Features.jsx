import { motion } from 'framer-motion';
import { HiLightningBolt, HiCollection, HiShieldCheck } from 'react-icons/hi';

export default function Features() {
  const list = [
    {
    icon: <HiLightningBolt className="w-6 h-6 text-indigo-500" />,
    title: "Multilingual Generation",
    desc: "Create AI images using prompts in multiple Indian languages, turning your ideas into visuals without language barriers.",
    },
    {
      icon: <HiLightningBolt className="w-6 h-6 text-indigo-500" />,
      title: 'Lightning Fast',
      desc: 'Generate ultra-high resolution images in under 8 seconds using our distributed GPU cluster.',
    },
    {
      icon: <HiCollection className="w-6 h-6 text-[var(--accent)]" />,
      title: 'Multiple Styles',
      desc: 'From photorealistic portraits to vibrant anime and cinematic concept art, choose your aesthetic.',
    }
   
  ];


  return (
    <section id="features" className="py-24 border-t border-[var(--border)] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-h)] mb-4">
            Power Your Creativity
          </h2>
          <p className="text-lg text-[var(--text)]">
            The future of image generation is here, built for professional workflows.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {list.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="p-8 rounded-3xl border border-[var(--border)] bg-[var(--bg)] shadow-md shadow-black/[0.02] flex flex-col items-start text-left transition-shadow hover:shadow-xl hover:shadow-[var(--accent)]/[0.03]"
            >
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-2xl bg-[var(--border)]/30 flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-[var(--text-h)] mb-3">
                {item.title}
              </h3>
              <p className="text-base text-[var(--text)] leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
