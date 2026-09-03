import { Inbox } from "lucide-react";

const EmptyState = ({
  icon: Icon = Inbox,
  title = "No data found",
  description = "There is nothing to display here yet.",
  action = null,
  className = "",
}) => {
  return (
    <div
      className={[
        "flex min-h-[280px] w-full flex-col items-center justify-center",
        "rounded-xl border border-dashed",
        "border-[rgb(var(--border))]",
        "bg-[rgb(var(--card))]",
        "px-6 py-10 text-center",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[rgb(var(--secondary))]">
        <Icon
          size={26}
          strokeWidth={1.8}
          className="text-[rgb(var(--muted-foreground))]"
          aria-hidden="true"
        />
      </div>

      <h3 className="text-lg font-semibold text-[rgb(var(--foreground))]">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-[rgb(var(--muted-foreground))]">
        {description}
      </p>

      {action && <div className="mt-5">{action}</div>}
    </div>
  );
};

export default EmptyState;
