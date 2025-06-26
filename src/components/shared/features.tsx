import { CheckCircle2, Truck, ShieldCheck, Users } from 'lucide-react'
import { features } from '@/lib/features'

const iconMap = {
  CheckCircle2,
  Truck,
  ShieldCheck,
  Users,
}

export default function FeaturesSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      {features.map((f, i) => {
        const Icon = iconMap[f.icon]
        return (
          <div
            key={f.title}
            className="flex items-center gap-3 bg-white rounded-xl shadow p-4"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <Icon className={f.iconClass} />
            <div>
              <div className="font-semibold text-gray-900">{f.title}</div>
              <div className="text-gray-500 text-sm">{f.desc}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
