import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Alessandra Albuquerque',
    role: 'Médica Cardiologista',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    quote: 'Como médica, sou extremamente exigente com biomecânica e saúde. O trabalho da Karla é impecável. Ela não foca apenas na estética, mas no equilíbrio metabólico e na prevenção real de lesões corporais.',
    stars: 5,
  },
  {
    name: 'Roberta Bittencourt',
    role: 'CEO & Founder TechGroup',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    quote: 'Minha rotina de executiva é estressante e imprevisível. A consultoria online da Karla se encaixou perfeitamente no meu dia a dia. Perdi 9kg e recuperei a energia mental que precisava para liderar minha empresa.',
    stars: 5,
  },
  {
    name: 'Vanessa Guedes',
    role: 'Advogada Associada',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    quote: 'Treinar com a Karla presencialmente é uma experiência de elite. O nível de cobrança é alto, mas o acolhimento e a inteligência comportamental dela me motivam a nunca faltar um treino sequer. Melhor investimento do ano.',
    stars: 5,
  },
]

function Testimonials() {
  return (
    <section id="depoimentos" className="relative py-24 bg-zinc-950 overflow-hidden border-t border-zinc-900">
      {/* Background gradients */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-amber-500 text-xs font-semibold tracking-widest uppercase block mb-3"
          >
            Depoimentos
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6 uppercase"
          >
            O que dizem nossas <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">Alunas VIP</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-zinc-400 text-lg"
          >
            A satisfação e a mudança de vida de quem confiou na metodologia KV Premium Training.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-8 flex flex-col justify-between hover:border-amber-500/20 transition-all duration-300 relative group"
            >
              {/* Quotation icon */}
              <div className="absolute top-6 right-8 text-zinc-800 group-hover:text-amber-500/10 transition-colors duration-300">
                <Quote className="w-10 h-10 rotate-180" />
              </div>

              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(item.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>

                <p className="text-zinc-300 text-sm md:text-base leading-relaxed italic mb-8 relative z-10">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 border-t border-zinc-800/60 pt-6 mt-auto">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border border-zinc-850 group-hover:border-amber-500/40 transition-colors duration-300"
                />
                <div>
                  <h4 className="text-white text-sm font-bold tracking-wide">{item.name}</h4>
                  <p className="text-zinc-400 text-xs font-semibold uppercase text-amber-500 tracking-wider">
                    {item.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
