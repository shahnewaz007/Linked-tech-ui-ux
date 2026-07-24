import { UserManager, type UserRow } from "./UserManager";

const SEED: UserRow[] = [
  { id: 1, name: "Rafiqul Islam", email: "rafiqul@linkedtechbd.com", phone: "+8801920200477", designation: "Managing Director", active: true },
  { id: 2, name: "Shahida Akter", email: "shahida@linkedtechbd.com", phone: "+8801711223344", designation: "Operations Head", active: true },
  { id: 3, name: "Mahbub Alam", email: "mahbub@linkedtechbd.com", phone: "+8801811556677", designation: "IT Administrator", active: false },
];

export function AdminUsersPage() {
  return <UserManager roleLabel="Admin" seed={SEED} />;
}
