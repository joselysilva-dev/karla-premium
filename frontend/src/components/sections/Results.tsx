import { motion } from 'framer-motion'
import { CheckCircle2, TrendingUp, Users, Award, ShieldCheck } from 'lucide-react'

const stats = [
  { id: 1, label: 'Alunas Transformadas', value: '+500', icon: Users },
  { id: 2, label: 'Média de Gordura Corporal Eliminada', value: '-8kg', icon: TrendingUp },
  { id: 3, label: 'Taxa de Fidelidade de Alunos', value: '96%', icon: ShieldCheck },
  { id: 4, label: 'Anos de Experiência Internacional', value: '10+', icon: Award },
]

const transformations = [
  {
    id: 1,
    name: 'Mariana S., 34 anos',
    metric: 'Eliminou 12kg & Ganhou 4kg de massa magra',
    tag: 'Recomposição Corporal',
    imageBefore: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=400',
    imageAfter: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=400',
    testimonial: 'A Karla mudou completamente minha relação com os treinos. Em 4 meses obtive o resultado de anos tentando sozinha.',
  },
  {
    id: 2,
    name: 'Carolina M., 29 anos',
    metric: 'Eliminou 7% de Gordura Corporal',
    tag: 'Definição e Performance',
    imageBefore: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=400',
    imageAfter: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&q=80&w=400',
    testimonial: 'Treinos dinâmicos, focados nas minhas limitações do joelho e altamente eficazes. Minha energia diária dobrou!',
  },
]

function Results() {
  return (
    <section id="resultados" className="relative py-24 bg-zinc-950 overflow-hidden border-t border-zinc-900">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-amber-500 text-xs font-semibold tracking-widest uppercase block mb-3"
          >
            Casos de Sucesso
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6 uppercase"
          >
            Resultados Reais de <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-yellow-500">Alunas Reais</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-zinc-400 text-lg"
          >
            A metodologia de treinamento personalizado de Karla Valente gera transformações visíveis e duradouras, focando na união de estética impecável com saúde inabalável.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-24">
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 md:p-8 hover:border-amber-500/30 transition-all duration-300 group"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-3xl md:text-5xl font-black text-amber-500 group-hover:scale-105 transition-transform duration-300">
                    {stat.value}
                  </span>
                  <Icon className="w-6 h-6 text-zinc-500 group-hover:text-amber-500 transition-colors duration-300" />
                </div>
                <p className="text-zinc-400 text-sm md:text-base font-medium">{stat.label}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Before & After Transformations Cards */}
        <div className="grid md:grid-cols-2 gap-10">
          {transformations.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:border-amber-500/20 transition-all duration-300"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
                    {item.tag}
                  </span>
                  <span className="text-zinc-400 text-sm font-semibold">{item.name}</span>
                </div>

                {/* Compare Photos Row */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-zinc-950 group">
                    <img
                      src={item.imageBefore}
                      alt="Antes"
                      className="w-full h-full object-cover filter grayscale opacity-60 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 bg-black/70 border border-zinc-800 text-zinc-400 text-[10px] font-bold tracking-widest px-2.5 py-1 rounded uppercase">
                      Antes
                    </div>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-zinc-950 group border border-amber-500/30">
                    <img
                      src={item.imageAfter}
                      alt="Depois"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 bg-amber-500 text-zinc-950 text-[10px] font-black tracking-widest px-2.5 py-1 rounded uppercase">
                      Depois
                    </div>
                  </div>
                </div>

                <h4 className="text-white text-xl font-bold mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" />
                  {item.metric}
                </h4>
                <p className="text-zinc-400 text-sm italic leading-relaxed mb-6">
                  "{item.testimonial}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Results
