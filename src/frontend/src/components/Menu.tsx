import { ExternalLink, Flame, Search, Trophy } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Badge = "bestseller" | "most_ordered" | "chefs_pick" | "recommended";

interface MenuItem {
  name: string;
  description: string;
  price: string;
  badges?: Badge[];
  isVeg: true;
}

interface CategoryData {
  label: string;
  icon: string;
  subtitle?: string;
  items: MenuItem[];
}

// ─── Zomato link ─────────────────────────────────────────────────────────────

const ZOMATO_URL =
  "https://www.zomato.com/ncr/raje-di-hatti-burari-new-delhi/order";

// ─── Category order ───────────────────────────────────────────────────────────

type CategoryKey =
  | "all"
  | "chole_bhature"
  | "amritsari_kulcha"
  | "lassi"
  | "tandoori_parantha"
  | "rice_curry"
  | "main_course"
  | "breads"
  | "special_thali";

const CATEGORY_KEYS: CategoryKey[] = [
  "all",
  "chole_bhature",
  "amritsari_kulcha",
  "lassi",
  "tandoori_parantha",
  "rice_curry",
  "main_course",
  "breads",
  "special_thali",
];

// ─── Menu Data (locked pricing) ───────────────────────────────────────────────

const MENU_DATA: Record<Exclude<CategoryKey, "all">, CategoryData> = {
  chole_bhature: {
    label: "Chole Bhature",
    icon: "🍽️",
    subtitle: "Breakfast Special — Served fresh every morning",
    items: [
      {
        name: "Chole Bhature (1 pc)",
        description: "Fluffy bhatura with spiced chickpea curry",
        price: "₹65",
        badges: ["bestseller"],
        isVeg: true,
      },
      {
        name: "Chole Bhature (2 pc)",
        description: "Double serving for big appetites",
        price: "₹95",
        badges: ["most_ordered"],
        isVeg: true,
      },
      {
        name: "Aloo Chole Bhature (1 pc)",
        description: "Potato-stuffed bhatura with chole",
        price: "₹70",
        badges: ["chefs_pick"],
        isVeg: true,
      },
      {
        name: "Aloo Chole Bhature (2 pc)",
        description: "Extra filling, double bhatura",
        price: "₹100",
        badges: ["recommended"],
        isVeg: true,
      },
      {
        name: "Paneer Chole Bhature (1 pc)",
        description: "Paneer-stuffed bhatura with chole",
        price: "₹70",
        isVeg: true,
      },
      {
        name: "Paneer Chole Bhature (2 pc)",
        description: "Paneer-stuffed, double serving",
        price: "₹100",
        isVeg: true,
      },
      {
        name: "Chole Kulche (1 pc)",
        description: "Soft kulcha with spiced chole",
        price: "₹65",
        isVeg: true,
      },
      {
        name: "Chole Kulche (2 pc)",
        description: "Double kulcha serving",
        price: "₹95",
        isVeg: true,
      },
      {
        name: "Aloo Chole Kulche (1 pc)",
        description: "Aloo-stuffed kulcha with chole",
        price: "₹70",
        isVeg: true,
      },
      {
        name: "Aloo Chole Kulche (2 pc)",
        description: "Double aloo kulcha",
        price: "₹100",
        isVeg: true,
      },
      {
        name: "Paneer Chole Kulche (1 pc)",
        description: "Paneer-stuffed kulcha with chole",
        price: "₹70",
        isVeg: true,
      },
      {
        name: "Paneer Chole Kulche (2 pc)",
        description: "Double paneer kulcha",
        price: "₹100",
        isVeg: true,
      },
    ],
  },

  amritsari_kulcha: {
    label: "Amritsari Kulcha",
    icon: "🫓",
    subtitle: "Served with Amritsari Chole + Butter",
    items: [
      {
        name: "Plain Kulcha",
        description: "Soft buttery plain kulcha",
        price: "₹25",
        badges: ["bestseller"],
        isVeg: true,
      },
      {
        name: "Aloo Kulcha",
        description: "Potato-stuffed Amritsari kulcha",
        price: "₹35",
        badges: ["most_ordered"],
        isVeg: true,
      },
      {
        name: "Paneer Kulcha",
        description: "Cottage cheese stuffed kulcha",
        price: "₹40",
        badges: ["chefs_pick"],
        isVeg: true,
      },
      {
        name: "Mixed Kulcha (Aloo + Paneer)",
        description: "Best of both — aloo and paneer",
        price: "₹45",
        isVeg: true,
      },
      {
        name: "Gobhi Kulcha",
        description: "Spiced cauliflower kulcha",
        price: "₹35",
        badges: ["recommended"],
        isVeg: true,
      },
      {
        name: "Onion Kulcha",
        description: "Crispy onion-stuffed kulcha",
        price: "₹35",
        isVeg: true,
      },
      {
        name: "Dal Kulcha",
        description: "Dal-stuffed soft kulcha",
        price: "₹35",
        isVeg: true,
      },
    ],
  },

  lassi: {
    label: "Lassi",
    icon: "🥛",
    subtitle: "Served chilled in kulhad",
    items: [
      {
        name: "Sweet Lassi",
        description: "Rich creamy sweet yogurt drink",
        price: "₹40",
        badges: ["bestseller"],
        isVeg: true,
      },
      {
        name: "Salted Lassi",
        description: "Refreshing salted yogurt drink",
        price: "₹40",
        isVeg: true,
      },
      {
        name: "Mango Lassi",
        description: "Thick mango yogurt drink",
        price: "₹60",
        badges: ["most_ordered"],
        isVeg: true,
      },
      {
        name: "Rose Lassi",
        description: "Rose-flavored creamy lassi",
        price: "₹50",
        isVeg: true,
      },
      {
        name: "Masala Chaas",
        description: "Spiced buttermilk",
        price: "₹30",
        badges: ["recommended"],
        isVeg: true,
      },
    ],
  },

  tandoori_parantha: {
    label: "Tandoori Parantha",
    icon: "🫓",
    subtitle: "Served with Curd + Pickle + Onion + Butter",
    items: [
      {
        name: "Plain Parantha",
        description: "Whole wheat layered parantha",
        price: "₹25",
        isVeg: true,
      },
      {
        name: "Aloo Parantha",
        description: "Potato-stuffed parantha",
        price: "₹40",
        badges: ["bestseller"],
        isVeg: true,
      },
      {
        name: "Gobhi Parantha",
        description: "Cauliflower-stuffed parantha",
        price: "₹40",
        isVeg: true,
      },
      {
        name: "Paneer Parantha",
        description: "Cottage cheese stuffed parantha",
        price: "₹50",
        badges: ["chefs_pick"],
        isVeg: true,
      },
      {
        name: "Mixed Parantha",
        description: "Aloo + Gobhi + Paneer mix",
        price: "₹55",
        isVeg: true,
      },
      {
        name: "Methi Parantha",
        description: "Fenugreek-flavored parantha",
        price: "₹35",
        badges: ["recommended"],
        isVeg: true,
      },
      {
        name: "Pyaaz Parantha",
        description: "Onion-stuffed parantha",
        price: "₹35",
        isVeg: true,
      },
      {
        name: "Dal Makhani Parantha",
        description: "Stuffed with rich dal makhani",
        price: "₹60",
        isVeg: true,
      },
    ],
  },

  rice_curry: {
    label: "Rice & Curry",
    icon: "🍚",
    items: [
      {
        name: "Dal Makhani",
        description: "Slow-cooked black lentils in butter",
        price: "₹120",
        badges: ["bestseller"],
        isVeg: true,
      },
      {
        name: "Dal Tadka",
        description: "Yellow dal with tempering",
        price: "₹80",
        isVeg: true,
      },
      {
        name: "Paneer Butter Masala",
        description: "Cottage cheese in rich tomato gravy",
        price: "₹160",
        badges: ["most_ordered"],
        isVeg: true,
      },
      {
        name: "Rajma Chawal",
        description: "Kidney beans curry with steamed rice",
        price: "₹120",
        badges: ["recommended"],
        isVeg: true,
      },
      {
        name: "Chole Rice",
        description: "Spiced chole with steamed rice",
        price: "₹100",
        isVeg: true,
      },
      {
        name: "Jeera Rice",
        description: "Cumin-flavored basmati rice",
        price: "₹80",
        isVeg: true,
      },
    ],
  },

  main_course: {
    label: "Main Course",
    icon: "🍛",
    items: [
      {
        name: "Dal Makhani (full)",
        description: "Full pot slow-cooked lentils",
        price: "₹180",
        badges: ["bestseller"],
        isVeg: true,
      },
      {
        name: "Paneer Tikka Masala",
        description: "Marinated paneer in tikka gravy",
        price: "₹200",
        badges: ["most_ordered"],
        isVeg: true,
      },
      {
        name: "Shahi Paneer",
        description: "Creamy royal paneer curry",
        price: "₹200",
        badges: ["chefs_pick"],
        isVeg: true,
      },
      {
        name: "Matar Paneer",
        description: "Green peas with cottage cheese",
        price: "₹160",
        isVeg: true,
      },
      {
        name: "Palak Paneer",
        description: "Cottage cheese in spinach gravy",
        price: "₹160",
        badges: ["recommended"],
        isVeg: true,
      },
      {
        name: "Malai Kofta",
        description: "Creamy cottage cheese dumplings",
        price: "₹180",
        isVeg: true,
      },
      {
        name: "Kadai Paneer",
        description: "Paneer in kadai masala",
        price: "₹170",
        isVeg: true,
      },
    ],
  },

  breads: {
    label: "Breads",
    icon: "🫓",
    items: [
      {
        name: "Tandoori Roti",
        description: "Classic tandoor-baked whole wheat roti",
        price: "₹20",
        badges: ["bestseller"],
        isVeg: true,
      },
      {
        name: "Butter Roti",
        description: "Butter-glazed roti",
        price: "₹25",
        isVeg: true,
      },
      {
        name: "Naan",
        description: "Soft leavened bread",
        price: "₹30",
        badges: ["most_ordered"],
        isVeg: true,
      },
      {
        name: "Butter Naan",
        description: "Butter-topped soft naan",
        price: "₹35",
        isVeg: true,
      },
      {
        name: "Garlic Naan",
        description: "Garlic-topped naan",
        price: "₹40",
        badges: ["chefs_pick"],
        isVeg: true,
      },
      {
        name: "Butter Garlic Naan",
        description: "Extra buttery garlic naan",
        price: "₹45",
        badges: ["recommended"],
        isVeg: true,
      },
      {
        name: "Laccha Parantha",
        description: "Multi-layered flaky parantha",
        price: "₹40",
        isVeg: true,
      },
      {
        name: "Puri",
        description: "Deep-fried puffed bread (2 pcs)",
        price: "₹20",
        isVeg: true,
      },
    ],
  },

  special_thali: {
    label: "Special Thali",
    icon: "🍽️",
    subtitle: "Complete Punjabi meals — best value",
    items: [
      {
        name: "Chole Bhature Thali",
        description: "2 Bhature + Chole + Pickle + Sweet",
        price: "₹150",
        badges: ["bestseller"],
        isVeg: true,
      },
      {
        name: "Amritsari Kulcha Thali",
        description: "2 Kulcha + Chole + Dal + Salad",
        price: "₹160",
        badges: ["most_ordered"],
        isVeg: true,
      },
      {
        name: "Full Punjabi Thali",
        description: "Dal Makhani + Paneer + 2 Bread + Rice + Dessert",
        price: "₹250",
        badges: ["chefs_pick"],
        isVeg: true,
      },
      {
        name: "Mini Thali",
        description: "Chole + 1 Bread + Rice + Raita",
        price: "₹120",
        badges: ["recommended"],
        isVeg: true,
      },
    ],
  },
};

// Category gradient per key
const CATEGORY_GRADIENT: Record<Exclude<CategoryKey, "all">, string> = {
  chole_bhature:
    "linear-gradient(135deg, rgba(255,122,24,0.28), rgba(245,197,66,0.12))",
  amritsari_kulcha:
    "linear-gradient(135deg, rgba(245,197,66,0.28), rgba(232,160,32,0.12))",
  lassi:
    "linear-gradient(135deg, rgba(168,85,247,0.22), rgba(245,197,66,0.10))",
  tandoori_parantha:
    "linear-gradient(135deg, rgba(255,122,24,0.22), rgba(245,197,66,0.10))",
  rice_curry:
    "linear-gradient(135deg, rgba(34,197,94,0.18), rgba(245,197,66,0.10))",
  main_course:
    "linear-gradient(135deg, rgba(245,197,66,0.22), rgba(255,122,24,0.12))",
  breads:
    "linear-gradient(135deg, rgba(251,191,36,0.22), rgba(245,197,66,0.10))",
  special_thali:
    "linear-gradient(135deg, rgba(245,197,66,0.30), rgba(255,122,24,0.18))",
};

// ─── Flat item list for "All" and search ─────────────────────────────────────

interface FlatItem {
  key: Exclude<CategoryKey, "all">;
  item: MenuItem;
  index: number;
}

function getAllItems(): FlatItem[] {
  const result: FlatItem[] = [];
  for (const key of CATEGORY_KEYS) {
    if (key === "all") continue;
    MENU_DATA[key].items.forEach((item, index) => {
      result.push({ key, item, index });
    });
  }
  return result;
}

const ALL_ITEMS = getAllItems();
const TOTAL_COUNT = ALL_ITEMS.length;

// ─── Badge Components ─────────────────────────────────────────────────────────

function BadgeBestseller() {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "3px",
        background: "linear-gradient(135deg, #f5c542, #e8aa1b)",
        color: "#050505",
        fontFamily: "Poppins, sans-serif",
        fontSize: "10px",
        fontWeight: 700,
        padding: "3px 8px",
        borderRadius: "10px",
        letterSpacing: "0.02em",
        whiteSpace: "nowrap",
        boxShadow: "0 0 10px rgba(245,197,66,0.35)",
      }}
    >
      🔥 Bestseller
    </span>
  );
}

function BadgeMostOrdered() {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "3px",
        background: "rgba(255,122,24,0.15)",
        color: "#ff7a18",
        border: "1px solid rgba(255,122,24,0.35)",
        fontFamily: "Poppins, sans-serif",
        fontSize: "10px",
        fontWeight: 700,
        padding: "3px 8px",
        borderRadius: "10px",
        letterSpacing: "0.02em",
        whiteSpace: "nowrap",
      }}
    >
      <Flame size={9} />
      Most Ordered
    </span>
  );
}

function BadgeRecommended() {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "3px",
        background: "rgba(148,163,184,0.10)",
        color: "#94a3b8",
        border: "1px solid rgba(148,163,184,0.25)",
        fontFamily: "Poppins, sans-serif",
        fontSize: "10px",
        fontWeight: 700,
        padding: "3px 8px",
        borderRadius: "10px",
        letterSpacing: "0.02em",
        whiteSpace: "nowrap",
      }}
    >
      ⭐ Recommended
    </span>
  );
}

function ItemBadges({ badges }: { badges?: Badge[] }) {
  if (!badges || badges.length === 0) return null;
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "4px",
        marginBottom: "8px",
      }}
    >
      {badges.map((b) => {
        if (b === "bestseller") return <BadgeBestseller key={b} />;
        if (b === "most_ordered") return <BadgeMostOrdered key={b} />;
        if (b === "chefs_pick") return <BadgesChefsPick key={b} />;
        if (b === "recommended") return <BadgeRecommended key={b} />;
        return null;
      })}
    </div>
  );
}

function BadgesChefsPick() {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "3px",
        background: "rgba(251,191,36,0.12)",
        color: "#fbbf24",
        border: "1px solid rgba(251,191,36,0.35)",
        fontFamily: "Poppins, sans-serif",
        fontSize: "10px",
        fontWeight: 700,
        padding: "3px 8px",
        borderRadius: "10px",
        letterSpacing: "0.02em",
        whiteSpace: "nowrap",
      }}
    >
      <Trophy size={9} />
      Chef's Top Pick
    </span>
  );
}

// ─── Item Icon ────────────────────────────────────────────────────────────────

function ItemIcon({
  icon,
  gradient,
  isChefPick,
}: {
  icon: string;
  gradient: string;
  isChefPick: boolean;
}) {
  return (
    <div
      style={{
        width: "54px",
        height: "54px",
        borderRadius: "16px",
        background: gradient,
        border: isChefPick
          ? "1px solid rgba(251,191,36,0.45)"
          : "1px solid rgba(245,197,66,0.18)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "22px",
        flexShrink: 0,
        boxShadow: isChefPick ? "0 0 14px rgba(251,191,36,0.18)" : "none",
        transition: "box-shadow 0.3s ease",
      }}
    >
      {icon}
    </div>
  );
}

// ─── Menu Item Card ───────────────────────────────────────────────────────────

function MenuItemCard({
  item,
  catKey,
  index,
  visible,
}: {
  item: MenuItem;
  catKey: Exclude<CategoryKey, "all">;
  index: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const catData = MENU_DATA[catKey];
  const gradient = CATEGORY_GRADIENT[catKey];
  const isChefPick = item.badges?.includes("chefs_pick") ?? false;
  const isThali = catKey === "special_thali";

  const thaliContents = isThali ? item.description.split(" + ") : [];

  return (
    <article
      data-ocid={`menu.item.${index + 1}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        padding: "20px",
        borderRadius: "20px",
        background: "rgba(255,255,255,0.03)",
        border: hovered
          ? "1px solid rgba(245,197,66,0.45)"
          : isChefPick
            ? "1px solid rgba(251,191,36,0.22)"
            : "1px solid rgba(255,255,255,0.08)",
        boxShadow: hovered
          ? "0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(245,197,66,0.12)"
          : isChefPick
            ? "0 4px 16px rgba(251,191,36,0.08)"
            : "0 2px 8px rgba(0,0,0,0.3)",
        transform: hovered
          ? "scale(1.02) translateY(-2px)"
          : "scale(1) translateY(0)",
        transition:
          "all 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease, transform 0.35s ease",
        opacity: visible ? 1 : 0,
        willChange: "transform",
        cursor: "default",
        animationDelay: `${index * 0.05}s`,
      }}
    >
      {/* Content row */}
      <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
        <ItemIcon
          icon={catData.icon}
          gradient={gradient}
          isChefPick={isChefPick}
        />

        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Badges */}
          <ItemBadges badges={item.badges} />

          {/* Name */}
          <h3
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              fontSize: "15px",
              color: "#ffffff",
              marginBottom: "4px",
              lineHeight: 1.3,
              letterSpacing: "0.01em",
            }}
          >
            {item.name}
          </h3>

          {/* Description / Thali contents */}
          {!isThali ? (
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "12px",
                color: "rgba(245,240,232,0.55)",
                lineHeight: 1.5,
                marginBottom: "10px",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {item.description}
            </p>
          ) : (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "4px",
                marginBottom: "10px",
              }}
            >
              {thaliContents.map((c) => (
                <span
                  key={c}
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "10px",
                    color: "rgba(212,168,67,0.8)",
                    background: "rgba(212,168,67,0.07)",
                    border: "1px solid rgba(212,168,67,0.18)",
                    borderRadius: "6px",
                    padding: "2px 6px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {c.trim()}
                </span>
              ))}
            </div>
          )}

          {/* Price + CTA row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            <span
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                fontSize: "17px",
                color: "#d4a843",
                textShadow: "0 0 14px rgba(212,168,67,0.25)",
                letterSpacing: "0.01em",
              }}
            >
              {item.price}
            </span>

            <a
              href={ZOMATO_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid={`menu.order_zomato.${index + 1}`}
              onClick={(e) => e.stopPropagation()}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                fontFamily: "Poppins, sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                color: "rgba(245,197,66,0.7)",
                background: "transparent",
                border: "1px solid rgba(245,197,66,0.22)",
                borderRadius: "8px",
                padding: "5px 10px",
                textDecoration: "none",
                transition: "all 0.25s ease",
                whiteSpace: "nowrap",
                letterSpacing: "0.02em",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#f5c542";
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  "rgba(245,197,66,0.55)";
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "rgba(245,197,66,0.06)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "rgba(245,197,66,0.7)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  "rgba(245,197,66,0.22)";
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "transparent";
              }}
            >
              Order on Zomato
              <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

// ─── Filter Bar ───────────────────────────────────────────────────────────────

interface FilterBarProps {
  search: string;
  onSearchChange: (v: string) => void;
  vegOnly: boolean;
  onVegToggle: () => void;
  resultCount: number;
  totalCount: number;
}

function FilterBar({
  search,
  onSearchChange,
  vegOnly,
  onVegToggle,
  resultCount,
  totalCount,
}: FilterBarProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ marginBottom: "20px" }}>
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
        data-ocid="menu.filter_bar"
      >
        {/* Search */}
        <div
          style={{
            flex: 1,
            minWidth: "200px",
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Search
            size={14}
            style={{
              position: "absolute",
              left: "14px",
              color: focused ? "#f5c542" : "rgba(245,240,232,0.35)",
              transition: "color 0.25s ease",
              pointerEvents: "none",
            }}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search dishes..."
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            data-ocid="menu.search_input"
            style={{
              width: "100%",
              background: "rgba(15,10,4,0.85)",
              border: `1px solid ${focused ? "rgba(245,197,66,0.55)" : "rgba(245,197,66,0.2)"}`,
              borderRadius: "12px",
              padding: "10px 36px 10px 40px",
              fontFamily: "Poppins, sans-serif",
              fontSize: "13px",
              color: "#f5f0e8",
              outline: "none",
              transition: "border-color 0.25s ease, box-shadow 0.25s ease",
              boxShadow: focused
                ? "0 0 0 3px rgba(245,197,66,0.08), 0 2px 12px rgba(0,0,0,0.3)"
                : "none",
            }}
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
              style={{
                position: "absolute",
                right: "12px",
                background: "none",
                border: "none",
                color: "rgba(245,240,232,0.4)",
                cursor: "pointer",
                fontSize: "16px",
                lineHeight: 1,
                padding: "2px",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#f5c542";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color =
                  "rgba(245,240,232,0.4)";
              }}
            >
              ×
            </button>
          )}
        </div>

        {/* Veg Only */}
        <button
          type="button"
          onClick={onVegToggle}
          data-ocid="menu.veg_filter.toggle"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            padding: "10px 16px",
            borderRadius: "12px",
            fontFamily: "Poppins, sans-serif",
            fontSize: "13px",
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
            border: vegOnly
              ? "1px solid rgba(34,197,94,0.55)"
              : "1px solid rgba(245,197,66,0.25)",
            background: vegOnly ? "rgba(34,197,94,0.12)" : "rgba(15,10,4,0.85)",
            color: vegOnly ? "#22c55e" : "rgba(245,240,232,0.55)",
            boxShadow: vegOnly ? "0 0 12px rgba(34,197,94,0.15)" : "none",
            whiteSpace: "nowrap",
          }}
        >
          <span
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: vegOnly ? "#22c55e" : "rgba(34,197,94,0.4)",
              border: "1.5px solid #22c55e",
              flexShrink: 0,
              transition: "background 0.2s ease",
            }}
          />
          Veg Only
        </button>
      </div>

      {/* Live count */}
      <p
        style={{
          fontFamily: "Poppins, sans-serif",
          fontSize: "11px",
          color: "rgba(245,240,232,0.35)",
          marginTop: "8px",
          letterSpacing: "0.03em",
        }}
      >
        {search
          ? `${resultCount} result${resultCount !== 1 ? "s" : ""} for "${search}"`
          : `${totalCount} dishes · Search or filter below`}
      </p>
    </div>
  );
}

// ─── Category Tabs ────────────────────────────────────────────────────────────

function CategoryTabs({
  activeTab,
  onSwitch,
  tabsRef,
}: {
  activeTab: CategoryKey;
  onSwitch: (k: CategoryKey) => void;
  tabsRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={tabsRef}
      data-ocid="menu.tab"
      style={{
        position: "sticky",
        top: "72px",
        zIndex: 30,
        background: "rgba(4,2,1,0.97)",
        borderBottom: "1px solid rgba(245,197,66,0.15)",
        borderTop: "1px solid rgba(245,197,66,0.06)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.65), 0 1px 0 rgba(245,197,66,0.06)",
        overflowX: "auto",
        scrollbarWidth: "none",
        display: "flex",
        gap: "6px",
        padding: "10px 16px",
        marginBottom: "24px",
        marginLeft: "-1rem",
        marginRight: "-1rem",
      }}
      className="hide-scrollbar"
    >
      {CATEGORY_KEYS.map((key) => {
        const isActive = activeTab === key;
        const label =
          key === "all"
            ? "All"
            : MENU_DATA[key as Exclude<CategoryKey, "all">].label;
        const icon =
          key === "all"
            ? "🍴"
            : MENU_DATA[key as Exclude<CategoryKey, "all">].icon;
        return (
          <button
            type="button"
            key={key}
            data-tab={key}
            onClick={() => onSwitch(key)}
            data-ocid={`menu.${key}.tab`}
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "12.5px",
              fontWeight: isActive ? 700 : 600,
              letterSpacing: "0.02em",
              whiteSpace: "nowrap",
              padding: "8px 16px",
              borderRadius: "20px",
              border: isActive
                ? "1px solid rgba(245,197,66,0.5)"
                : "1px solid transparent",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              background: isActive
                ? "linear-gradient(135deg, #d4a843 0%, #f5c542 50%, #e8a020 100%)"
                : "rgba(15,10,4,0.7)",
              color: isActive ? "#0a0602" : "rgba(245,240,232,0.55)",
              boxShadow: isActive
                ? "0 0 18px rgba(245,197,66,0.45), 0 4px 12px rgba(0,0,0,0.3)"
                : "none",
              outline: "none",
              transform: isActive ? "translateY(-1px)" : "translateY(0)",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.color = "#f5c542";
                el.style.borderColor = "rgba(245,197,66,0.25)";
                el.style.background = "rgba(245,197,66,0.08)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.color = "rgba(245,240,232,0.55)";
                el.style.borderColor = "transparent";
                el.style.background = "rgba(15,10,4,0.7)";
              }
            }}
          >
            {icon} {label}
          </button>
        );
      })}
    </div>
  );
}

// ─── Skeleton Loading ─────────────────────────────────────────────────────────

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <div
          key={n}
          className="skeleton-shimmer"
          style={{ height: "130px", borderRadius: "20px" }}
        />
      ))}
    </div>
  );
}

// ─── Main Menu ────────────────────────────────────────────────────────────────

export default function Menu() {
  const [activeTab, setActiveTab] = useState<CategoryKey>("chole_bhature");
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState<boolean[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [search, setSearch] = useState("");
  const [vegOnly, setVegOnly] = useState(false);
  const tabsRef = useRef<HTMLDivElement | null>(null);

  const isSearchActive = search.trim().length > 0;
  const isAllTab = activeTab === "all";

  // Get current items for display
  const currentItems: Array<{
    item: MenuItem;
    catKey: Exclude<CategoryKey, "all">;
    flatIndex: number;
  }> = (() => {
    if (isSearchActive) {
      return ALL_ITEMS.filter(({ item }) => {
        const q = search.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
        );
      }).map(({ item, key: catKey }, i) => ({ item, catKey, flatIndex: i }));
    }
    if (isAllTab) {
      return ALL_ITEMS.map(({ item, key: catKey }, i) => ({
        item,
        catKey,
        flatIndex: i,
      }));
    }
    const catKey = activeTab as Exclude<CategoryKey, "all">;
    return MENU_DATA[catKey].items.map((item, i) => ({
      item,
      catKey,
      flatIndex: i,
    }));
  })();

  const currentItemsLength = currentItems.length;

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  // Stagger items on tab change
  useEffect(() => {
    if (loading || isSearchActive) return;
    setVisibleItems([]);
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < currentItemsLength; i++) {
      timers.push(
        setTimeout(() => {
          setVisibleItems((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        }, i * 45),
      );
    }
    return () => timers.forEach(clearTimeout);
  }, [loading, isSearchActive, currentItemsLength]);

  // All search results visible immediately
  useEffect(() => {
    if (!isSearchActive) return;
    setVisibleItems(new Array(currentItemsLength).fill(true) as boolean[]);
  }, [isSearchActive, currentItemsLength]);

  const switchTab = useCallback(
    (key: CategoryKey) => {
      if (key === activeTab) return;
      setSearch("");
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveTab(key);
        setIsTransitioning(false);
      }, 150);
      const el = tabsRef.current?.querySelector(
        `[data-tab="${key}"]`,
      ) as HTMLElement | null;
      if (el && tabsRef.current) {
        // Manually scroll the horizontal tab container — avoids scrollIntoView affecting the window scroll
        const container = tabsRef.current;
        const elLeft = el.offsetLeft;
        const elWidth = el.offsetWidth;
        const containerWidth = container.offsetWidth;
        const targetScrollLeft = elLeft - containerWidth / 2 + elWidth / 2;
        container.scrollTo({ left: targetScrollLeft, behavior: "smooth" });
      }
    },
    [activeTab],
  );

  const isThaliCategory =
    !isSearchActive && !isAllTab && activeTab === "special_thali";
  const catData =
    !isAllTab && !isSearchActive
      ? MENU_DATA[activeTab as Exclude<CategoryKey, "all">]
      : null;

  return (
    <section
      id="menu"
      style={{
        backgroundColor: "#080502",
        padding: "96px 0 120px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="grain-overlay" aria-hidden="true" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <div className="text-center mb-14 animate-section">
          <span className="section-kicker">Full Menu</span>
          <h2
            style={{
              fontFamily: "Playfair Display, Georgia, serif",
              fontWeight: 900,
              fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
              lineHeight: 1.1,
              letterSpacing: "0.03em",
              background:
                "linear-gradient(135deg, #c49a28 0%, #d4a843 20%, #f5c542 50%, #ffd700 65%, #e8b84b 85%, #c49a28 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "12px",
            }}
          >
            Our Menu
          </h2>

          {/* Decorative divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              margin: "14px auto 16px",
            }}
          >
            <div
              style={{
                height: "1px",
                width: "60px",
                background:
                  "linear-gradient(90deg, transparent, rgba(245,197,66,0.6))",
              }}
            />
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#f5c542",
                boxShadow: "0 0 8px rgba(245,197,66,0.8)",
              }}
            />
            <div
              style={{
                height: "2px",
                width: "100px",
                background:
                  "linear-gradient(90deg, #f5c542, #ff7a18, rgba(245,197,66,0.4))",
                borderRadius: "2px",
              }}
            />
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#ff7a18",
                boxShadow: "0 0 8px rgba(255,122,24,0.8)",
              }}
            />
            <div
              style={{
                height: "1px",
                width: "60px",
                background:
                  "linear-gradient(90deg, rgba(255,122,24,0.6), transparent)",
              }}
            />
          </div>

          <p
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "14px",
              color: "rgba(245,240,232,0.5)",
              letterSpacing: "0.06em",
              fontStyle: "italic",
              marginBottom: "20px",
            }}
          >
            Authentic Punjabi flavors, made fresh every morning
          </p>

          <div className="flex justify-center gap-3 flex-wrap">
            <span
              style={{
                background: "rgba(34,197,94,0.08)",
                border: "1px solid rgba(34,197,94,0.3)",
                color: "#22c55e",
                fontFamily: "Poppins, sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                padding: "5px 14px",
                borderRadius: "999px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              🥗 100% Pure Veg
            </span>
            <span
              style={{
                background: "rgba(245,197,66,0.08)",
                border: "1px solid rgba(245,197,66,0.3)",
                color: "#f5c542",
                fontFamily: "Poppins, sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                padding: "5px 14px",
                borderRadius: "999px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {TOTAL_COUNT} Dishes
            </span>
          </div>
        </div>

        {/* ── Filter Bar ── */}
        <FilterBar
          search={search}
          onSearchChange={setSearch}
          vegOnly={vegOnly}
          onVegToggle={() => setVegOnly((v) => !v)}
          resultCount={currentItems.length}
          totalCount={TOTAL_COUNT}
        />

        {/* ── Demand Banner ── */}
        <div
          data-ocid="menu.demand_banner"
          style={{
            background:
              "linear-gradient(90deg, rgba(245,197,66,0.05) 0%, rgba(255,122,24,0.07) 50%, rgba(245,197,66,0.05) 100%)",
            borderTop: "1px solid rgba(245,197,66,0.18)",
            borderBottom: "1px solid rgba(245,197,66,0.08)",
            padding: "8px 16px",
            marginBottom: "6px",
            textAlign: "center",
            marginLeft: "-1rem",
            marginRight: "-1rem",
          }}
        >
          <p
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "11.5px",
              color: "rgba(245,197,66,0.65)",
              letterSpacing: "0.04em",
              fontStyle: "italic",
              margin: 0,
            }}
          >
            High demand during evenings — order early 🕐
          </p>
        </div>

        {/* ── Category Tabs ── */}
        {!isSearchActive && (
          <CategoryTabs
            activeTab={activeTab}
            onSwitch={switchTab}
            tabsRef={tabsRef}
          />
        )}

        {/* Category subtitle */}
        {catData?.subtitle && !isSearchActive && (
          <p
            style={{
              color: "rgba(245,240,232,0.38)",
              fontFamily: "Poppins, sans-serif",
              fontSize: "11.5px",
              fontStyle: "italic",
              textAlign: "center",
              marginBottom: "20px",
              letterSpacing: "0.05em",
            }}
          >
            ✦ {catData.subtitle} ✦
          </p>
        )}

        {/* ── Grid ── */}
        {loading ? (
          <SkeletonGrid />
        ) : currentItems.length > 0 ? (
          <div
            className={`grid gap-4 ${isThaliCategory ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}
            style={{
              opacity: isTransitioning ? 0 : 1,
              transform: isTransitioning ? "translateY(-6px)" : "translateY(0)",
              transition:
                "opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1), transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {currentItems.map(({ item, catKey, flatIndex }, i) => (
              <MenuItemCard
                key={`${catKey}-${item.name}`}
                item={item}
                catKey={catKey}
                index={flatIndex}
                visible={!!visibleItems[i]}
              />
            ))}
          </div>
        ) : (
          /* ── Empty State ── */
          <div
            data-ocid="menu.empty_state"
            style={{ textAlign: "center", padding: "64px 20px" }}
          >
            <p style={{ fontSize: "2.5rem", marginBottom: "12px" }}>
              {search ? "🔍" : "🥗"}
            </p>
            <p
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                color: "rgba(245,240,232,0.7)",
                marginBottom: "6px",
              }}
            >
              {search ? "No dishes found" : "No items here"}
            </p>
            <p
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "13px",
                color: "rgba(245,240,232,0.4)",
              }}
            >
              {search ? (
                <>
                  Try a different search or{" "}
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    style={{
                      color: "#f5c542",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: 700,
                    }}
                  >
                    clear the filter
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setVegOnly(false)}
                  style={{
                    color: "#f5c542",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 700,
                  }}
                >
                  Turn off Veg Only
                </button>
              )}
            </p>
          </div>
        )}

        {/* Order via Zomato CTA strip */}
        {!loading && currentItems.length > 0 && (
          <div
            style={{
              marginTop: "48px",
              textAlign: "center",
              padding: "24px",
              borderRadius: "20px",
              background:
                "linear-gradient(135deg, rgba(255,60,0,0.06), rgba(245,197,66,0.04))",
              border: "1px solid rgba(255,90,0,0.18)",
            }}
          >
            <p
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "13px",
                color: "rgba(245,240,232,0.5)",
                marginBottom: "12px",
                letterSpacing: "0.03em",
              }}
            >
              Order via your preferred platform
            </p>
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <a
                href="https://www.zomato.com/ncr/raje-di-hatti-burari-new-delhi/order"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="menu.order.zomato_button"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "10px 20px",
                  borderRadius: "12px",
                  background: "rgba(255,60,0,0.12)",
                  border: "1px solid rgba(255,60,0,0.3)",
                  color: "#ff3d00",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "13px",
                  fontWeight: 700,
                  textDecoration: "none",
                  transition: "all 0.25s ease",
                  letterSpacing: "0.03em",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "rgba(255,60,0,0.2)";
                  (e.currentTarget as HTMLAnchorElement).style.transform =
                    "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "rgba(255,60,0,0.12)";
                  (e.currentTarget as HTMLAnchorElement).style.transform =
                    "translateY(0)";
                }}
              >
                <ExternalLink size={13} />
                Order on Zomato
              </a>

              <a
                href="https://www.swiggy.com/search?query=raje+di+hatti+burari"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="menu.order.swiggy_button"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "10px 20px",
                  borderRadius: "12px",
                  background: "rgba(252,128,25,0.10)",
                  border: "1px solid rgba(252,128,25,0.28)",
                  color: "#fc8019",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "13px",
                  fontWeight: 700,
                  textDecoration: "none",
                  transition: "all 0.25s ease",
                  letterSpacing: "0.03em",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "rgba(252,128,25,0.18)";
                  (e.currentTarget as HTMLAnchorElement).style.transform =
                    "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "rgba(252,128,25,0.10)";
                  (e.currentTarget as HTMLAnchorElement).style.transform =
                    "translateY(0)";
                }}
              >
                <ExternalLink size={13} />
                Order on Swiggy
              </a>

              <a
                href="https://www.porter.in"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="menu.order.porter_button"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "10px 20px",
                  borderRadius: "12px",
                  background: "rgba(245,197,66,0.08)",
                  border: "1px solid rgba(245,197,66,0.25)",
                  color: "#d4a843",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "13px",
                  fontWeight: 700,
                  textDecoration: "none",
                  transition: "all 0.25s ease",
                  letterSpacing: "0.03em",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "rgba(245,197,66,0.15)";
                  (e.currentTarget as HTMLAnchorElement).style.transform =
                    "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "rgba(245,197,66,0.08)";
                  (e.currentTarget as HTMLAnchorElement).style.transform =
                    "translateY(0)";
                }}
              >
                <ExternalLink size={13} />
                Order on Porter
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Great Choice Toast - removed (no cart actions) */}
    </section>
  );
}
