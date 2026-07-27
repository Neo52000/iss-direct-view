import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts } from "@/lib/products";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { BarChart3 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/analytics")({
  head: () => ({
    meta: [{ title: "Back office — Analytics" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: AdminAnalyticsPage,
});

const COLORS = ["#2F80FF", "#71D7FF", "#4CAF50", "#FFB020", "#FF5A5F", "#9C27B0"];

function AdminAnalyticsPage() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", "all"],
    queryFn: fetchAllProducts,
  });

  const chartData = [...products]
    .sort((a, b) => b.clicks - a.clicks)
    .map((p) => ({
      name: p.title.length > 22 ? p.title.slice(0, 22) + "…" : p.title,
      clicks: p.clicks,
      id: p.id,
    }));

  const total = products.reduce((sum, p) => sum + p.clicks, 0);
  const topProduct = chartData[0];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-6">
      <div className="flex items-center gap-3">
        <BarChart3 className="h-6 w-6 text-[color:var(--iss-cyan)]" />
        <h1 className="font-display text-2xl font-extrabold">Analytics — Clics produits</h1>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="iss-card p-5">
          <p className="text-[11px] uppercase tracking-wider text-white/50">Total clics</p>
          <p className="mt-1 font-display text-3xl font-extrabold">{total.toLocaleString("fr")}</p>
        </div>
        <div className="iss-card p-5">
          <p className="text-[11px] uppercase tracking-wider text-white/50">Produits actifs</p>
          <p className="mt-1 font-display text-3xl font-extrabold">
            {products.filter((p) => p.active).length}
          </p>
        </div>
        <div className="iss-card p-5">
          <p className="text-[11px] uppercase tracking-wider text-white/50">Meilleur produit</p>
          <p className="mt-1 font-display text-base font-bold leading-snug">
            {topProduct?.name ?? "—"}
          </p>
          {topProduct ? <p className="text-sm text-white/60">{topProduct.clicks} clics</p> : null}
        </div>
      </div>

      <div className="iss-card mt-8 p-6">
        <h2 className="mb-4 font-display text-lg font-bold">Clics par produit</h2>
        {isLoading ? (
          <div className="h-48 animate-pulse rounded-lg bg-white/5" />
        ) : chartData.length === 0 ? (
          <p className="text-white/60">Aucun produit enregistré.</p>
        ) : (
          <ResponsiveContainer width="100%" height={chartData.length * 48 + 40}>
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 0, right: 20, bottom: 0, left: 0 }}
            >
              <XAxis
                type="number"
                tick={{ fill: "rgba(255,255,255,.4)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={160}
                tick={{ fill: "rgba(255,255,255,.7)", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "#0e1a2e",
                  border: "1px solid rgba(255,255,255,.1)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
                formatter={(val: number) => [val.toLocaleString("fr") + " clics", "Clics"]}
              />
              <Bar dataKey="clicks" radius={[0, 6, 6, 0]} maxBarSize={28}>
                {chartData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} fillOpacity={0.85} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="iss-card mt-6 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-4 py-3 text-left font-semibold text-white/60">Produit</th>
              <th className="px-4 py-3 text-left font-semibold text-white/60">Catégorie</th>
              <th className="px-4 py-3 text-right font-semibold text-white/60">Clics</th>
              <th className="px-4 py-3 text-right font-semibold text-white/60">Statut</th>
            </tr>
          </thead>
          <tbody>
            {[...products]
              .sort((a, b) => b.clicks - a.clicks)
              .map((p, i) => (
                <tr key={p.id} className={i % 2 === 0 ? "bg-white/[0.02]" : ""}>
                  <td className="px-4 py-3 font-medium">{p.title}</td>
                  <td className="px-4 py-3 text-white/60">{p.category}</td>
                  <td className="px-4 py-3 text-right font-display font-bold">
                    {p.clicks.toLocaleString("fr")}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${p.active ? "bg-[color:var(--iss-ok)]/15 text-[color:var(--iss-ok)]" : "bg-white/10 text-white/40"}`}
                    >
                      {p.active ? "Actif" : "Inactif"}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
