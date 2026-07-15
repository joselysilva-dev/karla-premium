import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Mail, MapPin, Send, CheckCircle, Clock } from 'lucide-react'

const contactSchema = z.object({
  nome: z.string().min(3, { message: 'Nome deve ter no mínimo 3 caracteres.' }),
  email: z.string().email({ message: 'Insira um e-mail válido.' }),
  telefone: z.string().min(10, { message: 'Insira um telefone/WhatsApp válido com DDD.' }),
  objetivo: z.string().min(1, { message: 'Selecione o seu principal objetivo.' }),
  modalidade: z.string().min(1, { message: 'Selecione a modalidade de interesse.' }),
  mensagem: z.string().optional(),
})

type ContactFormData = z.infer<typeof contactSchema>

function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log('Dados do formulário enviados:', data)
    setSubmitted(true)
    reset()
  }

  return (
    <section id="contato" className="relative py-24 bg-[#0F0F14] overflow-hidden border-t border-zinc-900/50">
      {/* Visual background lights */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#8A5CF6]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column: Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-[#8A5CF6] text-xs font-semibold tracking-widest uppercase block mb-3"
              >
                Canais de Atendimento
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#F8F8F8] mb-6 uppercase leading-tight"
              >
                Inicie Seu <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A5CF6] to-[#C9A6FF]">Acompanhamento</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-[#A9A9A9] text-base md:text-lg mb-10 font-light leading-relaxed"
              >
                Preencha os campos ao lado para realizarmos sua triagem física inicial. Entraremos em contato em até 24 horas úteis via WhatsApp para agendar sua entrevista VIP.
              </motion.p>
            </div>

            {/* Info Cards */}
            <div className="space-y-6">
              <div className="flex gap-4 items-center glass-card p-5 rounded-2xl">
                <div className="bg-[#8A5CF6]/10 border border-[#8A5CF6]/25 p-3 rounded-xl text-[#C9A6FF]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">WhatsApp VIP</h4>
                  <a href="https://wa.me/5584999999999" target="_blank" rel="noreferrer" className="text-[#F8F8F8] text-base font-bold tracking-wide hover:text-[#C9A6FF] transition-colors">
                    +55 (84) 99999-9999
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-center glass-card p-5 rounded-2xl">
                <div className="bg-[#8A5CF6]/10 border border-[#8A5CF6]/25 p-3 rounded-xl text-[#C9A6FF]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">E-mail Corporativo</h4>
                  <a href="mailto:contato@karlakarolynne.com.br" className="text-[#F8F8F8] text-base font-bold tracking-wide hover:text-[#C9A6FF] transition-colors">
                    contato@karlakarolynne.com.br
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-center glass-card p-5 rounded-2xl">
                <div className="bg-[#8A5CF6]/10 border border-[#8A5CF6]/25 p-3 rounded-xl text-[#C9A6FF]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">Studio / Atendimento</h4>
                  <p className="text-[#F8F8F8] text-sm font-semibold tracking-wide">
                    Atendimento Online (Global) & Presencial VIP
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-card rounded-3xl p-6 md:p-10 glow-premium"
            >
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid sm:grid-cols-2 gap-6">
                      {/* Name */}
                      <div>
                        <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">
                          Seu Nome Completo *
                        </label>
                        <input
                          type="text"
                          {...register('nome')}
                          placeholder="Ex: Mariana Silva"
                          className="w-full bg-[#0F0F14]/70 border border-zinc-800 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#8A5CF6] transition-all placeholder:text-zinc-600"
                        />
                        {errors.nome && (
                          <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.nome.message}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">
                          Seu E-mail Preferencial *
                        </label>
                        <input
                          type="email"
                          {...register('email')}
                          placeholder="Ex: mariana@exemplo.com"
                          className="w-full bg-[#0F0F14]/70 border border-zinc-800 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#8A5CF6] transition-all placeholder:text-zinc-600"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      {/* Phone */}
                      <div>
                        <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">
                          WhatsApp com DDD *
                        </label>
                        <input
                          type="text"
                          {...register('telefone')}
                          placeholder="Ex: (84) 99999-9999"
                          className="w-full bg-[#0F0F14]/70 border border-zinc-800 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#8A5CF6] transition-all placeholder:text-zinc-600"
                        />
                        {errors.telefone && (
                          <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.telefone.message}</p>
                        )}
                      </div>

                      {/* Objective Select */}
                      <div>
                        <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">
                          Principal Objetivo *
                        </label>
                        <select
                          {...register('objetivo')}
                          className="w-full bg-[#0F0F14]/70 border border-zinc-800 rounded-xl px-4 py-3.5 text-zinc-300 text-sm focus:outline-none focus:border-[#8A5CF6] transition-all"
                        >
                          <option value="">Selecione seu objetivo...</option>
                          <option value="emagrecimento">Emagrecimento Saudável</option>
                          <option value="hipertrofia">Ganho de Massa Magra</option>
                          <option value="definicao">Definição Muscular</option>
                          <option value="longevidade">Saúde e Vitalidade</option>
                        </select>
                        {errors.objetivo && (
                          <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.objetivo.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Modality Select */}
                    <div>
                      <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">
                        Modalidade Desejada *
                      </label>
                      <select
                        {...register('modalidade')}
                        className="w-full bg-[#0F0F14]/70 border border-zinc-800 rounded-xl px-4 py-3.5 text-zinc-300 text-sm focus:outline-none focus:border-[#8A5CF6] transition-all"
                      >
                        <option value="">Selecione a modalidade Desejada...</option>
                        <option value="presencial">Personal Training Presencial VIP</option>
                        <option value="online">Consultoria Online Premium (Global)</option>
                        <option value="hibrido">Híbrido (Presencial + Online)</option>
                      </select>
                      {errors.modalidade && (
                        <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.modalidade.message}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">
                        Mensagem / Alguma limitação articular? (Opcional)
                      </label>
                      <textarea
                        {...register('mensagem')}
                        rows={4}
                        placeholder="Ex: Desejo focar em ganho de força e definição. Não possuo restrições médicas."
                        className="w-full bg-[#0F0F14]/70 border border-zinc-800 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#8A5CF6] transition-all placeholder:text-zinc-600 resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-[#8A5CF6] hover:bg-[#8A5CF6]/90 disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-extrabold uppercase tracking-widest text-xs rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#8A5CF6]/10 hover:shadow-[#8A5CF6]/30"
                    >
                      {isSubmitting ? (
                        <>
                          <Clock className="w-4 h-4 animate-spin" /> Enviando Solicitação...
                        </>
                      ) : (
                        <>
                          Enviar Minha Ficha de Triagem <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-message"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="bg-[#8A5CF6]/15 border border-[#8A5CF6]/30 p-4 rounded-full text-[#C9A6FF] mb-6 animate-bounce">
                      <CheckCircle className="w-12 h-12" />
                    </div>
                    <h3 className="text-white text-2xl font-bold uppercase tracking-wide mb-3">
                      Inscrição Enviada com Sucesso!
                    </h3>
                    <p className="text-[#A9A9A9] text-sm md:text-base max-w-md leading-relaxed mb-8">
                      Obrigado pelo seu interesse, as informações foram recebidas com sucesso. Karla Karolynne ou um assessor entrará em contato em breve via WhatsApp. Prepare-se para sua evolução!
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 border border-zinc-850 hover:border-[#8A5CF6]/40 text-[#F8F8F8] hover:text-[#C9A6FF] font-bold uppercase tracking-wider text-[11px] rounded-lg transition-all duration-300 cursor-pointer"
                    >
                      Enviar Nova Mensagem
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Contact
