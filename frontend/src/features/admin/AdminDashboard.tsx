import { useCallback, useEffect, useState } from 'react'
import { adminApi, type Client, type Conversation } from '../../services/adminApi'
import type { AdminSection } from './AdminApp'

function date(value?: string | null) {
  return value ? new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(value)) : '—'
}

function State({ loading, error, empty }: { loading: boolean; error: string; empty?: boolean }) {
  if (loading) return <div className="admin-state">Carregando…</div>
  if (error) return <div className="admin-state error" role="alert">{error}</div>
  if (empty) return <div className="admin-state">Nenhum registro encontrado.</div>
  return null
}

function DashboardView() {
  const [data, setData] = useState<Awaited<ReturnType<typeof adminApi.dashboard>> | null>(null)
  const [error, setError] = useState('')
  useEffect(() => { void adminApi.dashboard().then(setData).catch((e: Error) => setError(e.message)) }, [])
  if (!data) return <State loading={!error} error={error} />
  return <section><div className="admin-heading"><div><small>Hoje</small><h1>Visão geral</h1></div></div>
    <div className="admin-stats">
      <article><span>Clientes</span><strong>{data.counts.clients}</strong></article>
      <article><span>Conversas</span><strong>{data.counts.conversations}</strong></article>
      <article><span>Mensagens</span><strong>{data.counts.messages}</strong></article>
      <article><span>Serviços</span><strong className="status-ok">Operacionais</strong><small>API e banco conectados</small></article>
    </div>
    <div className="admin-card"><h2>Últimos contatos</h2><ClientTable clients={data.recentContacts} /></div>
  </section>
}

function ClientTable({ clients, onSelect }: { clients: Client[]; onSelect?: (client: Client) => void }) {
  if (!clients.length) return <State loading={false} error="" empty />
  return <div className="admin-table-wrap"><table><thead><tr><th>Cliente</th><th>Contato</th><th>Último contato</th><th>Status</th></tr></thead><tbody>
    {clients.map((client) => <tr key={client.id} onClick={() => onSelect?.(client)} className={onSelect ? 'clickable' : ''}>
      <td><strong>{client.name}</strong></td><td>{client.email || client.phone || 'Não informado'}</td><td>{date(client.last_contact_at)}</td><td><span className={`badge ${client.is_active ? 'on' : 'off'}`}>{client.is_active ? 'Ativo' : 'Inativo'}</span></td>
    </tr>)}
  </tbody></table></div>
}

function ClientsView({ initialClientId }: { initialClientId?: string | null }) {
  const [clients, setClients] = useState<Client[]>([]); const [search, setSearch] = useState(''); const [selected, setSelected] = useState<Client | null>(null)
  const [loading, setLoading] = useState(true); const [error, setError] = useState(''); const [saved, setSaved] = useState(false)
  const load = useCallback(async () => { setLoading(true); setError(''); try { setClients((await adminApi.clients(search)).data) } catch (e) { setError((e as Error).message) } finally { setLoading(false) } }, [search])
  useEffect(() => { const timer = window.setTimeout(() => void load(), 250); return () => window.clearTimeout(timer) }, [load])
  useEffect(() => {
    if (!initialClientId || !clients.length || selected) return
    void adminApi.client(initialClientId).then(setSelected).catch((e: Error) => setError(e.message))
  }, [clients, initialClientId, selected])
  async function openClient(client: Client) { try { setSelected(await adminApi.client(client.id)); window.history.pushState({}, '', `/admin/clientes/${client.id}`) } catch (e) { setError((e as Error).message) } }
  async function save() { if (!selected) return; setSaved(false); try { const updated = await adminApi.updateClient(selected.id, selected); setSelected(updated); setClients((all) => all.map((item) => item.id === updated.id ? updated : item)); setSaved(true) } catch (e) { setError((e as Error).message) } }
  return <section><div className="admin-heading"><div><small>Relacionamento</small><h1>Clientes</h1></div><input aria-label="Pesquisar clientes" placeholder="Pesquisar nome, e-mail ou telefone" value={search} onChange={(e) => setSearch(e.target.value)} /></div>
    <State loading={loading} error={error} empty={!loading && !clients.length} />{!loading && <div className="admin-card"><ClientTable clients={clients} onSelect={(client) => void openClient(client)} /></div>}
    {selected && <div className="admin-modal" role="dialog" aria-modal="true" aria-label="Editar cliente"><div className="admin-modal__card"><button className="close" onClick={() => { window.history.pushState({}, '', '/admin/clientes'); setSelected(null) }} aria-label="Fechar">×</button><h2>Dados do cliente</h2>
      <label>Nome<input value={selected.name} onChange={(e) => setSelected({ ...selected, name: e.target.value })} /></label>
      <label>E-mail<input type="email" value={selected.email || ''} onChange={(e) => setSelected({ ...selected, email: e.target.value })} /></label>
      <label>Telefone<input value={selected.phone || ''} onChange={(e) => setSelected({ ...selected, phone: e.target.value })} /></label>
      <label>Notas<textarea rows={5} value={selected.notes || ''} onChange={(e) => setSelected({ ...selected, notes: e.target.value })} /></label>
      <label className="check"><input type="checkbox" checked={selected.is_active} onChange={(e) => setSelected({ ...selected, is_active: e.target.checked })} /> Atendimento ativo</label>
      {selected.profile && <div><h3>Perfil do aluno</h3>{Object.entries(selected.profile).map(([key, value]) => <p key={key}><strong>{key}:</strong> {value || '—'}</p>)}</div>}
      <a href={`/admin/conversas?clientId=${selected.id}`}>Ver conversas deste cliente</a>
      {saved && <p className="admin-alert success">Alterações salvas.</p>}<button onClick={() => void save()}>Salvar alterações</button></div></div>}
  </section>
}

function ConversationsView() {
  const [items, setItems] = useState<Conversation[]>([]); const [detail, setDetail] = useState<Awaited<ReturnType<typeof adminApi.conversation>> | null>(null)
  const [loading, setLoading] = useState(true); const [error, setError] = useState('')
  useEffect(() => { const clientId = new URLSearchParams(window.location.search).get('clientId') || ''; void adminApi.conversations(clientId).then((r) => setItems(r.data)).catch((e: Error) => setError(e.message)).finally(() => setLoading(false)) }, [])
  async function open(id: string) { try { setDetail(await adminApi.conversation(id)) } catch (e) { setError((e as Error).message) } }
  return <section><div className="admin-heading"><div><small>Atendimentos</small><h1>Conversas</h1></div></div><State loading={loading} error={error} empty={!loading && !items.length} />
    {!loading && items.length > 0 && <div className="admin-card admin-list">{items.map((item) => <button key={item.id} onClick={() => void open(item.id)}><div><strong>{item.client?.name || 'Visitante'}</strong><span>{item.title || 'Conversa'}</span></div><div><span>{item.messages?.[0]?.count || 0} mensagens</span><small>{date(item.updated_at)}</small></div></button>)}</div>}
    {detail && <div className="admin-modal" role="dialog" aria-modal="true" aria-label="Histórico da conversa"><div className="admin-modal__card wide"><button className="close" onClick={() => setDetail(null)} aria-label="Fechar">×</button><h2>{detail.client?.name || 'Visitante'}</h2><p>{date(detail.created_at)} · {detail.messages.length} mensagens</p><div className="admin-messages">{detail.messages.map((message) => <article key={message.id} className={message.role}><small>{message.role === 'assistant' ? 'Karla' : 'Cliente'} · {date(message.created_at)}</small><p>{message.content}</p></article>)}</div></div></div>}
  </section>
}

function SettingsView() {
  const [rows, setRows] = useState<Array<{ id: string; value: Record<string, unknown>; is_public: boolean }>>([]); const [loading, setLoading] = useState(true); const [error, setError] = useState(''); const [saved, setSaved] = useState(false)
  useEffect(() => { void adminApi.settings().then((r) => setRows(r.data)).catch((e: Error) => setError(e.message)).finally(() => setLoading(false)) }, [])
  const defaults = ['whatsapp', 'instagram', 'business_info']; const visible = defaults.map((id) => rows.find((row) => row.id === id) || { id, value: {}, is_public: true })
  async function save() { setSaved(false); try { await adminApi.saveSettings(visible); setSaved(true) } catch (e) { setError((e as Error).message) } }
  function change(id: string, text: string) { let value: Record<string, unknown>; try { value = JSON.parse(text) } catch { return } setRows((current) => [...current.filter((r) => r.id !== id), { id, value, is_public: true }]) }
  return <section><div className="admin-heading"><div><small>Conteúdo público</small><h1>Configurações do site</h1></div></div><State loading={loading} error={error} />{!loading && <div className="admin-card admin-form"><p>Informe valores em JSON. Exemplo: <code>{'{"url":"https://..."}'}</code></p>{visible.map((row) => <label key={row.id}>{row.id}<textarea rows={4} defaultValue={JSON.stringify(row.value, null, 2)} onBlur={(e) => change(row.id, e.target.value)} /></label>)}{saved && <p className="admin-alert success">Configurações salvas.</p>}<button onClick={() => void save()}>Salvar configurações</button></div>}</section>
}

export function AdminDashboard({ section, initialClientId }: { section: AdminSection; initialClientId?: string | null }) {
  if (section === 'clients') return <ClientsView initialClientId={initialClientId} />
  if (section === 'conversations') return <ConversationsView />
  if (section === 'settings') return <SettingsView />
  return <DashboardView />
}
