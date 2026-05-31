import { StaffMember } from "../data/staff";

export function generateVCard(staff: StaffMember): string {
  // Use a minimal vcard structure
  return `BEGIN:VCARD
VERSION:3.0
N:${staff.lastName};${staff.firstName};;;
FN:${staff.firstName} ${staff.lastName}
ORG:SchoolConnect Africa
TITLE:${staff.title}
TEL;TYPE=WORK,VOICE:${staff.phone}
EMAIL;TYPE=WORK,INTERNET:${staff.email}
URL:${staff.website}
END:VCARD`;
}

export function downloadVCard(staff: StaffMember) {
  const vcard = generateVCard(staff);
  const blob = new Blob([vcard], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${staff.firstName}_${staff.lastName}.vcf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
