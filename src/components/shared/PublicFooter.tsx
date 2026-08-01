import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, HeartPulse, Mail, Phone, MapPin } from 'lucide-react';

function PublicFooter() {
  return (
    <footer className="bg-muted pt-16 pb-8 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand & About */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <HeartPulse className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                PH Doc
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mt-4">
              Pioneering the future of healthcare with AI-driven doctor matching. 
              We connect you with top-rated medical professionals for personalized and secure care.
            </p>
            <div className="flex space-x-4 pt-2">
              <Link href="#" className="p-2 rounded-full bg-background text-muted-foreground hover:text-primary hover:shadow-md transition-all">
                <Facebook size={18} />
              </Link>
              <Link href="#" className="p-2 rounded-full bg-background text-muted-foreground hover:text-primary hover:shadow-md transition-all">
                <Twitter size={18} />
              </Link>
              <Link href="#" className="p-2 rounded-full bg-background text-muted-foreground hover:text-primary hover:shadow-md transition-all">
                <Instagram size={18} />
              </Link>
              <Link href="#" className="p-2 rounded-full bg-background text-muted-foreground hover:text-primary hover:shadow-md transition-all">
                <Linkedin size={18} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-foreground relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-secondary rounded-full"></span>
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2"></span> Home</Link></li>
              <li><Link href="/consultation" className="text-muted-foreground hover:text-primary transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2"></span> Consultation</Link></li>
              <li><Link href="/health-plans" className="text-muted-foreground hover:text-primary transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2"></span> Health Plans</Link></li>
              <li><Link href="/medicine" className="text-muted-foreground hover:text-primary transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2"></span> Medicine</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-foreground relative inline-block">
              Support
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-secondary rounded-full"></span>
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2"></span> FAQ</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2"></span> Help Center</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2"></span> Terms of Service</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2"></span> Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-foreground relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-secondary rounded-full"></span>
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start text-muted-foreground">
                <MapPin className="mr-3 h-5 w-5 text-primary shrink-0" />
                <span>123 Medical Innovation Lane<br />Health City, HC 12345</span>
              </li>
              <li className="flex items-center text-muted-foreground">
                <Phone className="mr-3 h-5 w-5 text-primary shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center text-muted-foreground">
                <Mail className="mr-3 h-5 w-5 text-primary shrink-0" />
                <span>contact@phdoc.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} PH Doc. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
            <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default PublicFooter;