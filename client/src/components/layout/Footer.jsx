import { Link } from "react-router-dom";


import Container from "../common/Container";
import { APP_CONFIG } from "../../constants/config";
import {
  FOOTER_NAVIGATION,
  SOCIAL_NAVIGATION,
} from "../../constants/navigation";

import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaLinkedin } from "react-icons/fa";

const SOCIAL_ICONS = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  twitter: FaTwitter,
  youtube: FaYoutube,
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[rgb(var(--border))] bg-[rgb(var(--secondary))]/40">
      <Container>
        <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:pr-8">
            <Link
              to="/"
              className="text-xl font-bold tracking-tight text-[rgb(var(--foreground))]"
            >
              {APP_CONFIG.name}
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-[rgb(var(--muted-foreground))]">
              {APP_CONFIG.description}
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-2">
              {SOCIAL_NAVIGATION.map((social) => {
                const Icon = SOCIAL_ICONS[social.key];
                const href = APP_CONFIG.social[social.key];

                if (!Icon || !href || href === "#") {
                  return null;
                }

                return (
                  <a
                    key={social.key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="rounded-lg p-2.5 text-[rgb(var(--muted-foreground))] transition-colors hover:bg-[rgb(var(--background))] hover:text-[rgb(var(--primary))]"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h2 className="text-sm font-semibold text-[rgb(var(--foreground))]">
              Explore
            </h2>

            <ul className="mt-4 space-y-3">
              {FOOTER_NAVIGATION.explore.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-sm text-[rgb(var(--muted-foreground))] transition-colors hover:text-[rgb(var(--primary))]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h2 className="text-sm font-semibold text-[rgb(var(--foreground))]">
              Company
            </h2>

            <ul className="mt-4 space-y-3">
              {FOOTER_NAVIGATION.company.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-sm text-[rgb(var(--muted-foreground))] transition-colors hover:text-[rgb(var(--primary))]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + Contact */}
          <div>
            <h2 className="text-sm font-semibold text-[rgb(var(--foreground))]">
              Legal
            </h2>

            <ul className="mt-4 space-y-3">
              {FOOTER_NAVIGATION.legal.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-sm text-[rgb(var(--muted-foreground))] transition-colors hover:text-[rgb(var(--primary))]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-2 text-sm text-[rgb(var(--muted-foreground))]">
              <p>{APP_CONFIG.contact.email}</p>
              <p>{APP_CONFIG.contact.phone}</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-3 border-t border-[rgb(var(--border))] py-6 text-sm text-[rgb(var(--muted-foreground))] sm:flex-row sm:items-center sm:justify-between">
          <p className="leading-6">
            © {currentYear} {APP_CONFIG.name}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link
              to="/privacy-policy"
              className="transition-colors hover:text-[rgb(var(--primary))]"
            >
              Privacy
            </Link>

            <Link
              to="/terms"
              className="transition-colors hover:text-[rgb(var(--primary))]"
            >
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
