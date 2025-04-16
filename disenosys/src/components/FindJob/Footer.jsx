import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-blue-400 py-6 px-4 md:px-10  bottom-0 left-0 right-0 z-50 shadow-inner mt-12 md:mt-0">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white">
          <p>© 2025 Diseñosys™. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacyandpolicy" className="hover:underline">Privacy Policy</Link>
            <Link href="/termsandcondition" className="hover:underline">Terms of Service</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  