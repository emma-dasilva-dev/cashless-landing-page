"use client";

import { useEffect, useState } from "react";
import { FaArrowRightArrowLeft, FaCreditCard, FaShieldHalved, FaWallet } from "react-icons/fa6";
import { FiActivity, FiTrendingUp } from "react-icons/fi";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type DailyPoint = { date: string; count: number };
type Stats = {
  start_date: string; end_date: string;
  acquisition: { registered_users: number; avg_per_day: number; avg_per_week: number; avg_per_month: number; series_daily: DailyPoint[] };
  active_users: { definition: string; avg_per_day: number; avg_per_week: number; avg_per_month: number; series_daily: DailyPoint[] };
  kyc: { approved: number; approved_with_sudo_account: number; refused: number; not_done: number; pending: number };
  accounts: { xof: number; ngn: number; inactive: number; deleted: number };
  cards: { created: number; active: number; blocked: number };
  transactions: { xof: { count: number; volume: number }; ngn: { count: number; volume: number }; series_daily: { date: string; xof: number; ngn: number }[] };
};
type Period = "month" | "quarter" | "year" | "all";
type ActiveUsersMode = "all" | "login" | "transaction";
type ChartLine = { key: string; label: string; color: string };

const formatNumber = (value: number) => new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 2 }).format(Number(value) || 0);
const formatDate = (value: string) => { const date = new Date(`${value}T12:00:00`); return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString("fr-FR", { day: "2-digit", month: "short" }); };
const definitionLabels: Record<string, string> = { login: "Connexion", transaction: "Transaction", login_or_transaction: "Tous" };

function StatCard({ label, value, subtitle }: { label: string; value: string | number; subtitle?: string }) { return <article className="investor-stat-card"><span>{label}</span><strong>{value}</strong>{subtitle ? <small>{subtitle}</small> : null}</article>; }

function CommercialLineChart({ title, data, lines, currency }: { title: string; data: Array<Record<string, string | number>>; lines: ChartLine[]; currency?: boolean }) {
  const chartData = data.map((point) => Object.fromEntries(Object.entries(point).map(([key, value]) => [key, key === "date" ? value : Number(value) || 0])));
  return <article className="investor-chart-card"><div className="investor-chart-title"><h3>{title}</h3>{lines.length > 1 ? <div className="investor-chart-legend">{lines.map((line) => <span key={line.key}><i style={{ backgroundColor: line.color }} />{line.label}</span>)}</div> : null}</div>{chartData.length ? <div className="investor-chart"><ResponsiveContainer width="100%" height="100%"><LineChart data={chartData} margin={{ left: 4, right: 12, top: 8, bottom: 0 }}><CartesianGrid vertical={false} stroke="#e8eef3" /><XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} minTickGap={32} tickFormatter={(value) => formatDate(String(value))} /><YAxis tickLine={false} axisLine={false} allowDecimals={!currency} width={currency ? 58 : 40} tickFormatter={(value) => formatNumber(Number(value))} /><Tooltip labelFormatter={(value) => formatDate(String(value))} formatter={(value, name) => [`${formatNumber(Number(value))}${currency ? ` ${String(name).toUpperCase()}` : ""}`, lines.find((line) => line.key === String(name))?.label ?? String(name)]} /><Line type="monotone" dataKey={lines[0].key} name={lines[0].key} stroke={lines[0].color} strokeWidth={2} dot={lines.length === 1 ? { r: 3, fill: lines[0].color, strokeWidth: 0 } : false} activeDot={{ r: 5 }} />{lines.slice(1).map((line) => <Line key={line.key} type="monotone" dataKey={line.key} name={line.key} stroke={line.color} strokeWidth={2} dot={false} activeDot={{ r: 5 }} />)}</LineChart></ResponsiveContainer></div> : <p className="investor-empty-chart">Aucune donnée sur cette période.</p>}</article>;
}

export default function InvestorCommercialStats() {
  const [stats, setStats] = useState<Stats | null>(null); const [error, setError] = useState(""); const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<Period>("month"); const [startDate, setStartDate] = useState(""); const [endDate, setEndDate] = useState(""); const [activeUsersMode, setActiveUsersMode] = useState<ActiveUsersMode>("all");
  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({ period });
    if (startDate && endDate) { params.set("start_date", startDate); params.set("end_date", endDate); }
    if (activeUsersMode !== "all") params.set("active_users_mode", activeUsersMode);
    setLoading(true); setError("");
    fetch(`/api/investors/commercial?${params}`, { cache: "no-store", signal: controller.signal })
      .then(async (response) => ({ response, result: await response.json() }))
      .then(({ response, result }) => { if (!response.ok || !result.ok) throw new Error(result.error); setStats(result.data as Stats); })
      .catch((reason) => { if (reason instanceof Error && reason.name === "AbortError") return; setError(reason instanceof Error ? reason.message : "Impossible de charger les statistiques."); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [activeUsersMode, endDate, period, startDate]);
  const changePeriod = (nextPeriod: Period) => { setPeriod(nextPeriod); setStartDate(""); setEndDate(""); }; const customRangeActive = Boolean(startDate && endDate);
  return <section className="investor-stats"><div className="investor-stats-heading"><div><p className="investor-eyebrow">CASHLESS INVESTORS</p><h1>Statistiques commerciales</h1><p>{stats ? `${stats.start_date} — ${stats.end_date}` : "Chargement des données…"}</p></div><div className="investor-filters"><div className="investor-period-buttons" aria-label="Période statistiques">{([["month", "Mois"], ["quarter", "Trimestre"], ["year", "Année"], ["all", "Tout"]] as [Period, string][]).map(([value, label]) => <button type="button" key={value} className={!customRangeActive && period === value ? "is-active" : ""} onClick={() => changePeriod(value)}>{label}</button>)}</div><div className="investor-date-range"><input aria-label="Date de début" type="date" value={startDate} max={endDate || undefined} onChange={(event) => setStartDate(event.target.value)} /><span>au</span><input aria-label="Date de fin" type="date" value={endDate} min={startDate || undefined} onChange={(event) => setEndDate(event.target.value)} />{customRangeActive ? <button type="button" onClick={() => { setStartDate(""); setEndDate(""); }}>Effacer</button> : null}</div></div></div>{error ? <p className="investor-error" role="alert">{error}</p> : null}{loading && !stats ? <p className="investor-loading">Chargement des données…</p> : null}{stats ? <div className="investor-board-wrap">{loading ? <div className="investor-loading-overlay" role="status"><i />Mise à jour des statistiques…</div> : null}<div className="investor-board">
    <section className="investor-section"><h2><FiTrendingUp />Acquisition</h2><div className="investor-stat-grid investor-stat-grid-four"><StatCard label="Inscrits (total)" value={formatNumber(stats.acquisition.registered_users)} /><StatCard label="Moyenne / jour" value={formatNumber(stats.acquisition.avg_per_day)} /><StatCard label="Moyenne / semaine" value={formatNumber(stats.acquisition.avg_per_week)} /><StatCard label="Moyenne / mois" value={formatNumber(stats.acquisition.avg_per_month)} /></div><CommercialLineChart title="Inscriptions par jour" data={stats.acquisition.series_daily} lines={[{ key: "count", label: "Inscriptions", color: "#0c9d83" }]} /></section>
    <section className="investor-section"><div className="investor-section-title"><h2><FiActivity />Utilisateurs actifs <em>({definitionLabels[stats.active_users.definition] ?? stats.active_users.definition})</em></h2><div className="investor-mode-toggle">{([["all", "Tous"], ["login", "Connexion"], ["transaction", "Transaction"]] as [ActiveUsersMode, string][]).map(([mode, label]) => <button type="button" key={mode} className={activeUsersMode === mode ? "is-active" : ""} onClick={() => setActiveUsersMode(mode)}>{label}</button>)}</div></div><div className="investor-stat-grid investor-stat-grid-three"><StatCard label="Moyenne / jour" value={formatNumber(stats.active_users.avg_per_day)} /><StatCard label="Moyenne / semaine" value={formatNumber(stats.active_users.avg_per_week)} /><StatCard label="Moyenne / mois" value={formatNumber(stats.active_users.avg_per_month)} /></div><CommercialLineChart title="Utilisateurs actifs par jour" data={stats.active_users.series_daily} lines={[{ key: "count", label: "Utilisateurs", color: "#2563eb" }]} /></section>
    <section className="investor-section"><h2><FaShieldHalved />KYC</h2><div className="investor-stat-grid investor-stat-grid-five"><StatCard label="Approuvés" value={formatNumber(stats.kyc.approved)} /><StatCard label="Approuvés + compte Sudo Naira" value={formatNumber(stats.kyc.approved_with_sudo_account)} /><StatCard label="Refusés" value={formatNumber(stats.kyc.refused)} /><StatCard label="Non fait" value={formatNumber(stats.kyc.not_done)} /><StatCard label="En attente" value={formatNumber(stats.kyc.pending)} /></div></section>
    <section className="investor-section"><h2><FaWallet />Comptes</h2><div className="investor-stat-grid investor-stat-grid-four"><StatCard label="Comptes XOF" value={formatNumber(stats.accounts.xof)} /><StatCard label="Comptes NGN" value={formatNumber(stats.accounts.ngn)} /><StatCard label="Comptes inactifs" value={formatNumber(stats.accounts.inactive)} /><StatCard label="Comptes supprimés" value={formatNumber(stats.accounts.deleted)} /></div></section>
    <section className="investor-section"><h2><FaCreditCard />Cartes</h2><div className="investor-stat-grid investor-stat-grid-three"><StatCard label="Cartes créées" value={formatNumber(stats.cards.created)} /><StatCard label="Cartes actives" value={formatNumber(stats.cards.active)} /><StatCard label="Cartes bloquées" value={formatNumber(stats.cards.blocked)} /></div></section>
    <section className="investor-section"><h2><FaArrowRightArrowLeft />Transactions (complétées, période)</h2><div className="investor-stat-grid investor-stat-grid-two"><StatCard label="Transactions XOF" value={formatNumber(stats.transactions.xof.count)} subtitle={`Volume : ${formatNumber(stats.transactions.xof.volume)} XOF`} /><StatCard label="Transactions NGN" value={formatNumber(stats.transactions.ngn.count)} subtitle={`Volume : ${formatNumber(stats.transactions.ngn.volume)} NGN`} /></div><CommercialLineChart title="Volume des transactions complétées" data={stats.transactions.series_daily} lines={[{ key: "xof", label: "Volume XOF", color: "#7c3aed" }, { key: "ngn", label: "Volume NGN", color: "#ea580c" }]} currency /></section>
  </div></div> : null}</section>;
}
