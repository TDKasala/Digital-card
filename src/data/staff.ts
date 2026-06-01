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
    logoUrl: "/logo.jpg"
  }
};
