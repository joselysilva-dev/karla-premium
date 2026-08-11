export const motivationalQuotes = [
  'Constância transforma intenção em evolução.',
  'Seu corpo aprende com cada escolha que você repete.',
  'Disciplina é autocuidado colocado em prática.',
  'A evolução acontece quando você honra o processo.',
  'Treinar também é reservar um tempo para você.',
  'Força se constrói um movimento de cada vez.',
  'O treino de hoje prepara a confiança de amanhã.',
  'Pequenos avanços sustentam grandes mudanças.',
  'Cuidar da saúde é um compromisso com a sua história.',
  'Você não precisa ser perfeita, precisa ser constante.',
  'Cada repetição consciente aproxima você do seu objetivo.',
  'Respeitar o seu ritmo também faz parte da evolução.',
  'Sua disciplina merece tanto reconhecimento quanto o resultado.',
  'Movimento é uma forma poderosa de autocuidado.',
  'O progresso real cabe na rotina que você consegue manter.',
  'A força que você treina acompanha você fora da academia.',
  'Hoje é uma nova oportunidade de escolher por você.',
  'Consistência vence a pressa e fortalece o caminho.',
  'Seu melhor treino é aquele que respeita o seu momento.',
  'Evoluir é continuar, inclusive nos dias mais lentos.',
  'Saúde é presença, equilíbrio e escolhas possíveis.',
  'A disciplina cria espaço para a liberdade que você deseja.',
  'Reconheça cada conquista, mesmo as que ninguém vê.',
  'Seu compromisso de hoje é parte da mulher que você está construindo.',
  'Treine com intenção, evolua com paciência.',
  'A sua força não começa no peso; começa na decisão.',
  'Descanso, treino e alimentação fazem parte do mesmo cuidado.',
  'O que você faz com frequência importa mais do que o que faz às vezes.',
  'Confie na repetição dos bons hábitos.',
  'Você merece sentir orgulho do caminho, não apenas da chegada.',
  'Cada treino concluído é uma promessa cumprida com você.',
] as const

export function quoteForDate(date = new Date()) {
  const day = Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000)
  return motivationalQuotes[((day % motivationalQuotes.length) + motivationalQuotes.length) % motivationalQuotes.length]
}