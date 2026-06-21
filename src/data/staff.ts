export interface StaffMember {
  slug: string;
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  whatsapp: string;
  website: string;
  linkedin?: string;
  twitter?: string;
  bio: string;
  avatarUrl: string;
  logoUrl: string;
}

export const staffData: Record<string, StaffMember> = {
  "landry-kasala": {
    slug: "landry-kasala",
    firstName: "Landry",
    lastName: "Kasala",
    title: "Directeur Général",
    email: "contact@schoolconnectafrica.co.za",
    phone: "+27658712749",
    whatsapp: "+27658712749",
    website: "https://schoolconnectafrica.co.za",
    linkedin: "https://linkedin.com/in/landrykasala",
    twitter: "https://twitter.com/landrykasala",
    bio: "Passionné par la transformation de l'EdTech en Afrique. Notre vision est d'apporter une plateforme de gestion scolaire moderne, adaptée au contexte africain, pour responsabiliser la prochaine génération.",
    avatarUrl: "/avatar.jpg",
    logoUrl: "/logo.png"
  },
  "luc-mulunga": {
    slug: "luc-mulunga",
    firstName: "Dr Luc",
    lastName: "Mulunga",
    title: "Consultant Direction de Kolwezi / Likasi",
    email: "contact@schoolconnectafrica.co.za",
    phone: "+243976787166",
    whatsapp: "+243976787166",
    website: "https://schoolconnectafrica.co.za",
    bio: "Consultant dévoué pour SchoolConnect Africa, coordonnant les initiatives éducatives dans les régions de Kolwezi et Likasi afin de renforcer l'accès à une gestion scolaire moderne en RDC.",
    avatarUrl: "/avatar-luc-mulunga.jpg",
    logoUrl: "/logo.png"
  }
};
