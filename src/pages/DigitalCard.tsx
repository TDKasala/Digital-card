import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { staffData } from "../data/staff";
import { QRCodeSVG } from "qrcode.react";
import { downloadVCard } from "../utils/vcard";
import { initAuth, googleSignIn, getAccessToken } from "../lib/auth";
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  Globe, 
  Linkedin, 
  Twitter, 
  Download,
  Share2,
  Calendar,
  ChevronLeft,
  UserPlus,
  Copy,
  Check
} from "lucide-react";
import { Link } from "react-router-dom";

export default function DigitalCard() {
  const { slug } = useParams<{ slug: string }>();
  const staff = slug ? staffData[slug] : null;
  const [viewCount, setViewCount] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (slug && staff) {
      const key = `view_count_${slug}`;
      const currentCount = parseInt(localStorage.getItem(key) || "0", 10);
      const newCount = currentCount + 1;
      localStorage.setItem(key, newCount.toString());
      setViewCount(newCount);
    }
  }, [slug, staff]);

  if (!staff) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white p-6">
        <h1 className="text-2xl font-bold mb-4">Carte introuvable</h1>
        <p className="text-slate-400 mb-8 text-center">Nous n'avons pas trouvé la carte numérique que vous cherchiez.</p>
        <Link to="/" className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-full transition-colors">
          <ChevronLeft className="w-4 h-4" /> Retour à l'annuaire
        </Link>
      </div>
    );
  }

  const currentUrl = typeof window !== 'undefined' ? window.location.href : staff.website;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${staff.firstName} ${staff.lastName} - Carte de Visite Numérique`,
          text: `Découvrez la carte de visite numérique de ${staff.firstName}`,
          url: currentUrl,
        });
      } catch (err) {
        console.error("Erreur de partage:", err);
      }
    } else {
      navigator.clipboard.writeText(currentUrl);
      alert("Lien copié dans le presse-papiers !");
    }
  };

  const handleSaveToGoogle = async () => {
    try {
      let token = await getAccessToken();
      if (!token) {
        const result = await googleSignIn();
        if (result) token = result.accessToken;
      }
      if (!token) return;

      const confirmed = window.confirm(`Voulez-vous ajouter ${staff.firstName} ${staff.lastName} à vos Google Contacts ?`);
      if (!confirmed) return;

      const response = await fetch('https://people.googleapis.com/v1/people:createContact', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          names: [{ givenName: staff.firstName, familyName: staff.lastName }],
          emailAddresses: [{ value: staff.email, type: "work" }],
          phoneNumbers: [{ value: staff.phone, type: "mobile" }],
          organizations: [{ name: "SchoolConnect Africa", title: staff.title, type: "work" }]
        })
      });

      if (!response.ok) throw new Error('Erreur API');
      alert("Contact sauvegardé dans Google Contacts !");
    } catch (err: any) {
      if (err.message === 'CONFIG_MISSING') {
        alert("L'intégration Google Contacts nécessite une configuration Firebase complète. Veuillez utiliser le bouton vCard en attendant.");
        return;
      }
      console.error(err);
      alert("Impossible d'enregistrer le contact.");
    }
  };

  const parentVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const childVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-12 sm:pt-12 flex items-center justify-center p-4">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={parentVariants}
        className="w-full max-w-[380px] mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] p-6 sm:p-8 flex flex-col text-center shadow-2xl relative overflow-hidden"
      >
        {/* Glow Effects */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-600/20 blur-[80px] pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-emerald-600/20 blur-[80px] pointer-events-none"></div>

        <button onClick={() => window.history.back()} className="absolute top-6 left-6 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-colors z-20" title="Retour">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="absolute top-6 right-6 flex gap-2 z-20">
          <button 
            onClick={handleCopyLink} 
            className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-colors relative"
            title="Copier le lien"
          >
            {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
          </button>
          <button onClick={handleShare} className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-colors" title="Partager">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Brand/Logo Section */}
        <div className="mt-14 flex items-center justify-center gap-2 mb-8 z-10 w-full relative">
          <div className="relative">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center overflow-hidden">
               <img src={staff.logoUrl} alt="Logo" className="w-full h-full object-cover mix-blend-multiply opacity-80" />
            </div>
          </div>
          <span className="text-xs font-bold tracking-widest uppercase text-emerald-400">SchoolConnect Africa</span>
        </div>

        {/* Profile Info Section */}
        <div className="relative mb-6 z-10 flex flex-col items-center">
          <div className="w-32 h-32 rounded-full border-4 border-emerald-500/30 p-1 mb-4">
            <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
              <img 
                src={staff.avatarUrl} 
                alt={staff.firstName} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <motion.div variants={childVariants} className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-white mb-1">
              {staff.firstName} {staff.lastName}
            </h1>
            <p className="text-slate-400 text-sm font-medium mb-8 uppercase tracking-wide">
              {staff.title}
            </p>
          </motion.div>
        </div>

        {/* Quick Actions Grid */}
        <motion.div variants={childVariants} className="grid grid-cols-2 gap-3 w-full mb-8 z-10">
          <a href={`https://wa.me/${staff.whatsapp.replace('+', '')}`} target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-2xl transition-all">
            <span className="text-xs text-emerald-400 mb-1 flex items-center gap-1"><MessageCircle className="w-3 h-3"/> WhatsApp</span>
            <span className="text-[10px] text-slate-500">Discuter</span>
          </a>
          <a href={`tel:${staff.phone}`} className="flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-2xl transition-all">
            <span className="text-xs text-blue-400 mb-1 flex items-center gap-1"><Phone className="w-3 h-3"/> Appel</span>
            <span className="text-[10px] text-slate-500">Voix</span>
          </a>
          <a href={`mailto:${staff.email}`} className="flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-2xl transition-all">
            <span className="text-xs text-purple-400 mb-1 flex items-center gap-1"><Mail className="w-3 h-3"/> Email</span>
            <span className="text-[10px] text-slate-500">Envoyer mail</span>
          </a>
          <a href={staff.website} target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-2xl transition-all">
            <span className="text-xs text-orange-400 mb-1 flex items-center gap-1"><Globe className="w-3 h-3"/> Web</span>
            <span className="text-[10px] text-slate-500">Voir détails</span>
          </a>
        </motion.div>

        {/* Bio Section */}
        <motion.div variants={childVariants} className="w-full mb-6 z-10">
          <div className="p-6 rounded-[32px] bg-white/5 border border-white/10 text-left">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-500 mb-2">À propos</h3>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              {staff.bio}
            </p>
          </div>
        </motion.div>

        {/* Book Demo CTA */}
        <motion.div variants={childVariants} className="w-full mb-6 z-10">
          <a 
            href="https://www.schoolconnectafrica.co.za/contact" 
            target="_blank"
            rel="noreferrer"
            className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" /> Réserver une Démo Visuelle
          </a>
        </motion.div>

        {/* QR Code & VCard */}
        <motion.div variants={childVariants} className="mt-auto w-full flex items-center justify-between gap-4 bg-emerald-500/10 p-4 rounded-3xl border border-emerald-500/20 z-10">
          <div className="relative shrink-0 select-none">
            {/* Soft glowing ambient background using a radial gradient */}
            <div className="absolute -inset-3 bg-[radial-gradient(circle,_rgba(16,185,129,0.45)_0%,_rgba(16, 185, 129,0)_70%)] rounded-full blur-md opacity-80 pointer-events-none"></div>
            
            {/* Container with semi-transparent border and neon shadow glow */}
            <div className="relative w-16 h-16 bg-white/10 backdrop-blur-md border border-emerald-400/40 p-1 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.25)] flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-lg flex items-center justify-center overflow-hidden relative">
                <QRCodeSVG 
                  value={currentUrl}
                  size={80}
                  bgColor={"#020617"} // Slate 950 matching
                  fgColor={"#10b981"} // Emerald 500 for a stunning green glow effect
                  level={"M"} // Medium level redundancy for extra reliability
                  includeMargin={false}
                  className="scale-[0.82]"
                />
              </div>
            </div>
          </div>
          <div className="text-left flex-1">
            <p className="text-xs font-bold text-emerald-400 mb-0.5">Scanner pour Sauvegarder</p>
            <p className="text-[10px] text-slate-400 leading-tight mb-2">Sauvegardez ce contact directement dans votre téléphone.</p>
            <button onClick={() => downloadVCard(staff)} className="w-full text-[10px] uppercase font-black bg-emerald-500 hover:bg-emerald-400 transition-colors text-slate-950 px-3 py-2 rounded-full inline-flex items-center justify-center gap-1">
              <Download className="w-3 h-3" /> Télécharger vCard
            </button>
          </div>
        </motion.div>

        {/* View Count */}
        <motion.div variants={childVariants} className="w-full mt-4 text-center z-10 relative">
          <p className="text-[10px] text-slate-500">
            Carte consultée <span className="font-bold text-slate-400">{viewCount}</span> fois
          </p>
        </motion.div>

      </motion.div>
    </div>
  );
}
