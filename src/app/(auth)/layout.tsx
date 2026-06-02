import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 bg-background px-6 py-16">
      <Link
        href="/"
        className="text-sm font-medium uppercase tracking-[0.35em] text-muted-foreground"
      >
        Vallna
      </Link>
      {children}
    </div>
  );
}
