import { ExternalLink, MapPin } from "lucide-react";

const ContactMap = ({
  embedUrl = "",
  mapUrl = "",
  title = "Find us on the map",
  address = "India",
  className = "",
}) => {
  return (
    <div
      className={[
        "overflow-hidden rounded-2xl border",
        "border-[rgb(var(--border))]",
        "bg-[rgb(var(--card))]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {embedUrl ? (
        <div className="aspect-video w-full">
          <iframe
            src={embedUrl}
            title={title}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="flex aspect-video min-h-72 flex-col items-center justify-center bg-[rgb(var(--secondary))] px-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]">
            <MapPin size={26} strokeWidth={1.8} aria-hidden="true" />
          </div>

          <h3 className="mt-4 text-lg font-semibold text-[rgb(var(--foreground))]">
            {title}
          </h3>

          <p className="mt-2 max-w-md text-sm leading-6 text-[rgb(var(--muted-foreground))]">
            {address}
          </p>

          {mapUrl && (
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[rgb(var(--primary))] px-4 py-2.5 text-sm font-medium text-[rgb(var(--primary-foreground))] transition-opacity hover:opacity-90"
            >
              Open in Maps
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default ContactMap;
