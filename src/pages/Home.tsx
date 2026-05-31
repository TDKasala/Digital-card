import { Link } from "react-router-dom";
import { staffData } from "../data/staff";

export default function Home() {
  const staffArray = Object.values(staffData);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] shadow-2xl p-8 space-y-6 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-600/20 blur-[80px] pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-emerald-600/20 blur-[80px] pointer-events-none"></div>

        <div className="text-center space-y-2 relative z-10">
          <h1 className="text-2xl font-bold text-white">Annuaire SchoolConnect</h1>
          <p className="text-slate-400">Sélectionnez la carte de visite numérique d'un membre.</p>
        </div>
        
        <div className="flex flex-col gap-3 relative z-10">
          {staffArray.map((staff) => (
            <Link 
              key={staff.slug} 
              to={`/card/${staff.slug}`}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-medium text-slate-200"
            >
              <img 
                src={staff.avatarUrl} 
                alt={staff.firstName} 
                className="w-12 h-12 rounded-full object-cover shadow-sm border border-slate-700 bg-slate-800"
              />
              <div className="flex-1">
                <div className="leading-tight text-white">{staff.firstName} {staff.lastName}</div>
                <div className="text-sm text-emerald-400 font-medium tracking-wide uppercase mt-0.5">{staff.title}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
