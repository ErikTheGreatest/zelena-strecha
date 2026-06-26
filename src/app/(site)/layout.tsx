import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DisclaimerPopup from "@/components/ui/DisclaimerPopup";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DisclaimerPopup />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
