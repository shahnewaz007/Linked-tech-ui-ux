import { UserManager, type UserRow } from "./UserManager";

const SEED: UserRow[] = [
  { id: 1, name: "Tania Rahman", email: "tania@linkedtechbd.com", phone: "+8801611998877", designation: "Content Editor", active: true },
  { id: 2, name: "Sabbir Hossain", email: "sabbir@linkedtechbd.com", phone: "+8801511224466", designation: "Catalog Editor", active: true },
];

export function EditorUsersPage() {
  return <UserManager roleLabel="Editor" seed={SEED} />;
}
