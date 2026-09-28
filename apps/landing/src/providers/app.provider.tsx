import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { fontPrimary, fontSecondary } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        fontPrimary.variable,
        fontSecondary.variable,
        "isolate font-primary relative",
      )}
    >
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
