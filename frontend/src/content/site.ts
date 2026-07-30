import {
  Activity,
  BrainCircuit,
  ClipboardCheck,
  Dumbbell,
  HeartPulse,
  LineChart,
  MonitorSmartphone,
  ScanLine,
  Target,
  type LucideIcon,
} from 'lucide-react'

export type Service = {
  icon: LucideIcon
  title: string
  description: string
  cta: string
  href: string
}

export const aboutHighlights = [
  { title: 'Experiência que escuta', description: 'Cada decisão parte da sua rotina, histórico e objetivos — sem fórmulas prontas.' },
  { title: 'Método com propósito', description: 'Treino, comportamento e evolução física conectados em um plano possível de sustentar.' },
  { title: 'Acompanhamento próximo', description: 'Orientação clara para que você treine com autonomia, segurança e confiança.' },
]

export const services: Service[] = [
  { icon: Dumbbell, title: 'Personal Trainer', description: 'Sessões presenciais com técnica, progressão e atenção a cada detalhe do seu movimento.', cta: 'Quero treinar presencialmente', href: '#contato' },
  { icon: MonitorSmartphone, title: 'Consultoria Online', description: 'Planejamento individual para treinar de onde estiver, com direção e suporte contínuo.', cta: 'Conhecer a consultoria', href: '#contato' },
  { icon: ScanLine, title: 'Avaliação Física', description: 'Diagnóstico inicial para transformar informações em metas claras e acompanhamento assertivo.', cta: 'Agendar avaliação', href: '#contato' },
  { icon: ClipboardCheck, title: 'Planejamento de Treinos', description: 'Estratégias estruturadas para o seu momento, preferência, disponibilidade e evolução.', cta: 'Montar meu plano', href: '#contato' },
  { icon: HeartPulse, title: 'Acompanhamento', description: 'Ajustes e orientação para manter consistência, respeitando o seu corpo e a sua rotina.', cta: 'Entender o acompanhamento', href: '#contato' },
  { icon: BrainCircuit, title: 'IA Karla', description: 'Orientações iniciais sobre treino e hábitos para complementar o seu atendimento.', cta: 'Conversar com a IA', href: '#ia-karla' },
]

export const methodSteps = [
  { number: '01', icon: Target, title: 'Diagnóstico', description: 'Entendemos seus objetivos, contexto, histórico e o que faz sentido para a sua rotina.' },
  { number: '02', icon: ClipboardCheck, title: 'Planejamento', description: 'Traduzimos esse diagnóstico em uma estratégia clara, progressiva e personalizada.' },
  { number: '03', icon: Activity, title: 'Acompanhamento', description: 'Ajustamos o caminho com proximidade, técnica e espaço para a sua realidade.' },
  { number: '04', icon: LineChart, title: 'Resultados', description: 'Construímos evolução que você percebe no corpo, na disposição e na confiança.' },
]

export const outcomeAreas = [
  { title: 'Emagrecimento consciente', description: 'Estratégias que priorizam saúde, aderência e uma relação mais sustentável com o corpo.' },
  { title: 'Força e composição corporal', description: 'Evolução construída com técnica, progressão e metas alinhadas ao seu momento.' },
  { title: 'Rotina com mais energia', description: 'Acompanhamento para transformar o treino em uma prática consistente da sua semana.' },
]

export const faqs = [
  { question: 'Para quem é o acompanhamento da Karla?', answer: 'Para mulheres que desejam treinar com estratégia, segurança e uma orientação personalizada, independentemente do nível de experiência.' },
  { question: 'Como funciona a consultoria online?', answer: 'Você recebe um planejamento individual e acompanhamento para executar seus treinos com clareza, mesmo à distância.' },
  { question: 'A IA Karla substitui o acompanhamento profissional?', answer: 'Não. Ela oferece orientações iniciais e complementa o atendimento. Avaliações, decisões de treino e acompanhamento individual continuam sendo conduzidos pela Karla.' },
  { question: 'Quais formas de pagamento estão disponíveis?', answer: 'As possibilidades são apresentadas durante o contato inicial, de acordo com o serviço e a modalidade escolhidos.' },
  { question: 'Em quais horários acontece o atendimento?', answer: 'O atendimento é organizado conforme a modalidade contratada. Envie uma mensagem para verificar disponibilidade e os melhores horários para você.' },
]

export const quickPrompts = [
  'Como posso começar a emagrecer com segurança?',
  'Qual a frequência ideal de treino?',
  'Como criar hábitos mais consistentes?',
]

export const whatsappUrl = 'https://wa.me/5564993195319?text=Olá%20Karla,%20gostaria%20de%20saber%20mais%20sobre%20o%20seu%20acompanhamento.'
