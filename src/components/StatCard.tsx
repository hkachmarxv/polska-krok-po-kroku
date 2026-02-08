import { ReactNode } from 'react';

interface StatCardProps {
  icon: ReactNode;
  value: string | number;
  label: string;
}

export const StatCard = ({ icon, value, label }: StatCardProps) => (
  <div className="bg-card rounded-2xl border border-border p-4 text-center animate-scale-in shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-center mb-2">{icon}</div>
    <p className="font-display text-2xl font-bold text-foreground">{value}</p>
    <p className="text-[11px] text-muted-foreground font-medium mt-0.5">{label}</p>
  </div>
);
