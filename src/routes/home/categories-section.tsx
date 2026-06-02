// Categories section component
import { categories } from "./categories-data";
import { Link } from "@tanstack/react-router";

export function CategoriesSection() {
  return (
    <div className="mt-20 flex flex-wrap justify-center gap-2.5">
      {categories.map(({ icon: Icon, label }) => (
        <Link
          key={label}
          to="/explorar"
          className="group flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-2 text-sm text-muted-foreground transition-all hover:border-gold/40 hover:bg-card hover:text-foreground"
        >
          <Icon className="h-4 w-4 text-gold transition-transform group-hover:scale-110" />
          {label}
        </Link>
      ))}
    </div>
  );
}