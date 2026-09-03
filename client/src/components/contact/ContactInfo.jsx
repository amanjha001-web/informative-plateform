import { Clock3, Mail, MapPin, Phone } from "lucide-react";

import { APP_CONFIG } from "../../constants/config";

const ContactInfo = ({
  email = APP_CONFIG.contact.email,
  phone = APP_CONFIG.contact.phone,
  address = APP_CONFIG.contact.address,
  responseTime = "We usually respond within 24–48 hours.",
  className = "",
}) => {
  const contactItems = [
    {
      icon: Mail,
      label: "Email",
      value: email,
      href: `mailto:${email}`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: phone,
      href: `tel:${phone.replace(/\s/g, "")}`,
    },
    {
      icon: MapPin,
      label: "Address",
      value: address,
    },
    {
      icon: Clock3,
      label: "Response Time",
      value: responseTime,
    },
  ];

  return (
    <div className={["space-y-4", className].filter(Boolean).join(" ")}>
      {contactItems.map((item) => {
        const Icon = item.icon;

        const content = (
          <div className="flex gap-4 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5 transition-all duration-200 hover:border-[rgb(var(--primary))]/30 hover:shadow-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]">
              <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-[rgb(var(--foreground))]">
                {item.label}
              </p>

              <p className="mt-1 break-words text-sm leading-6 text-[rgb(var(--muted-foreground))]">
                {item.value}
              </p>
            </div>
          </div>
        );

        return item.href ? (
          <a key={item.label} href={item.href} className="block">
            {content}
          </a>
        ) : (
          <div key={item.label}>{content}</div>
        );
      })}
    </div>
  );
};

export default ContactInfo;
