import { ReactNode } from 'react';

interface StatCardProps {
  icon: ReactNode;
  value: string | number;
  label: string;
}

export const StatCard = ({ icon, value, label }: StatCardProps) => (
  <div className="bg-card rounded-lg border border-border p-3 text-center animate-scale-in">
    <div className="flex justify-center mb-1">{icon}</div>
    <p className="font-display text-xl font-bold text-foreground">{value}</p>
    <p className="text-xs text-muted-foreground">{label}</p>
  </div>
);
