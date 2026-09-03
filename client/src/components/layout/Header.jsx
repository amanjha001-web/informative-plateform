import Container from "../common/Container";
import Breadcrumb from "../common/Breadcrumb";

const Header = ({
  title,
  description = "",
  breadcrumbs = [],
  centered = false,
  className = "",
}) => {
  return (
    <section
      className={[
        "border-b border-[rgb(var(--border))]",
        "bg-[rgb(var(--secondary))]/40",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Container>
        <div className="py-8 sm:py-10 md:py-14">
          {breadcrumbs.length > 0 && (
            <div className="mb-4 sm:mb-5">
              <Breadcrumb items={breadcrumbs} />
            </div>
          )}

          <div
            className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}
          >
            {title && (
              <h1 className="text-3xl font-bold tracking-tight text-[rgb(var(--foreground))] sm:text-4xl md:text-5xl">
                {title}
              </h1>
            )}

            {description && (
              <p className="mt-4 text-base leading-7 text-[rgb(var(--muted-foreground))] md:text-lg">
                {description}
              </p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Header;
