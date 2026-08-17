export interface Organization {
  slug: string;
  name: string;
  website: string;
  logoUrl: string;
  ctaLabel: string;
  ctaUrl: string;
}

export interface StaffMember {
  slug: string;
  orgSlug: string;
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

const base = import.meta.env.BASE_URL;

export const organizations: Record<string, Organization> = {
  "schoolconnect-africa": {
    slug: "schoolconnect-africa",
    name: "SchoolConnect Africa",
    website: "https://schoolconnectafrica.co.za",
    logoUrl: `${base}logo.png`,
    ctaLabel: "Réserver une Démo Visuelle",
    ctaUrl: "https://www.schoolconnectafrica.co.za/contact"
  },
  "hopital-connect": {
    slug: "hopital-connect",
    name: "Hôpital Connect",
    website: "https://hc.kasalatechnologies.co.za",
    logoUrl: `${base}logo-hopital-connect.png`,
    ctaLabel: "Réserver une Démo Visuelle",
    ctaUrl: "https://hc.kasalatechnologies.co.za"
  }
};

export const staffData: Record<string, StaffMember> = {
  "landry-kasala": {
    slug: "landry-kasala",
    orgSlug: "schoolconnect-africa",
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
    avatarUrl: `${base}avatar.jpg`,
    logoUrl: `${base}logo.png`
  },
  "luc-mulunga": {
    slug: "luc-mulunga",
    orgSlug: "schoolconnect-africa",
    firstName: "Dr Luc",
    lastName: "Mulunga",
    title: "Consultant Direction de Kolwezi / Likasi",
    email: "contact@schoolconnectafrica.co.za",
    phone: "+243976787166",
    whatsapp: "+243976787166",
    website: "https://schoolconnectafrica.co.za",
    bio: "Consultant dévoué pour SchoolConnect Africa, coordonnant les initiatives éducatives dans les régions de Kolwezi et Likasi afin de renforcer l'accès à une gestion scolaire moderne en RDC.",
    avatarUrl: `${base}avatar-luc-mulunga.jpg`,
    logoUrl: `${base}logo.png`
  },
  "luc-mulunga-hopital-connect": {
    slug: "luc-mulunga-hopital-connect",
    orgSlug: "hopital-connect",
    firstName: "Dr Luc",
    lastName: "Mulunga",
    title: "Consultant Direction Générale RDC",
    email: "contact@schoolconnectafrica.co.za",
    phone: "+243976787166",
    whatsapp: "+243976787166",
    website: "https://hc.kasalatechnologies.co.za",
    bio: "Consultant en direction générale pour la RDC, spécialisé dans les solutions SaaS médicales. Luc accompagne hôpitaux et cliniques dans leur transition numérique avec Hôpital Connect, une plateforme de gestion hospitalière moderne pensée pour le contexte africain.",
    avatarUrl: `${base}avatar-luc-mulunga.jpg`,
    logoUrl: `${base}logo-hopital-connect.png`
  }
};
