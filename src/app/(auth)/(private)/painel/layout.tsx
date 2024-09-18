export const dynamic = "force-dynamic";
export const revalidate = false;
export const fetchCache = "force-no-store";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
