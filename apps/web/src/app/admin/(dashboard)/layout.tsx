import type { Metadata } from "next";
import { Message, connectToDatabase } from "@charm/db";
import { AdminShell } from "@/components/admin/admin-shell";
import { requireSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false, nocache: true },
};

/** Cookie-backed auth means these pages can never be statically cached. */
export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await requireSession();

  let unreadCount = 0;
  try {
    await connectToDatabase();
    unreadCount = await Message.countDocuments({ status: "unread" });
  } catch {
    // A dashboard badge is not worth failing the whole page over.
  }

  return (
    <AdminShell userName={session.name || session.email} unreadCount={unreadCount}>
      {children}
    </AdminShell>
  );
}
