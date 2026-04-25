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
  | "breakfast"
  | "amritsari_kulcha"
  | "tandoori_paratha"
  | "main_course"
  | "rice"
  | "lassi"
  | "breads"
  | "special_thali"
  | "raita_salad"
  | "soft_drinks";

const CATEGORY_KEYS: CategoryKey[] = [
  "all",
  "breakfast",
  "amritsari_kulcha",
  "tandoori_paratha",
  "main_course",
  "rice",
  "lassi",
  "breads",
  "special_thali",
  "raita_salad",
  "soft_drinks",
];

// ─── Menu Data ────────────────────────────────────────────────────────────────

const MENU_DATA: Record<Exclude<CategoryKey, "all">, CategoryData> = {
  breakfast: {
    label: "Breakfast",
    icon: "🍽️",
    subtitle: "Till 11:00 AM",
    items: [
      {
        name: "Aloo Chole Bhature",
        description: "Served with chole, onion & butter",
        price: "₹65 (1pc) / ₹95 (2pc)",
        badges: ["bestseller"],
        isVeg: true,
      },
      {
        name: "Paneer Chole Bhature",
        description: "Served with chole, onion & butter",
        price: "₹70 (1pc) / ₹100 (2pc)",
        badges: ["chefs_pick"],
        isVeg: true,
      },
      {
        name: "Chole Kulche",
        description: "Served with chole, onion & butter",
        price: "₹65 (1pc) / ₹95 (2pc)",
        badges: ["most_ordered"],
        isVeg: true,
      },
    ],
  },

  amritsari_kulcha: {
    label: "Amritsari Kulcha",
    icon: "🫓",
    subtitle: "Served with Chole + Onion + Butter",
    items: [
      {
        name: "Amritsari Aloo Onion Kulcha",
        description: "Classic aloo & onion stuffed kulcha",
        price: "₹90 (1pc) / ₹180 (2pc)",
        badges: ["bestseller"],
        isVeg: true,
      },
      {
        name: "Amritsari Paneer Kulcha",
        description: "Rich paneer stuffed kulcha",
        price: "₹110 (1pc) / ₹200 (2pc)",
        badges: ["most_ordered"],
        isVeg: true,
      },
      {
        name: "Amritsari Gobhi Kulcha",
        description: "Fresh gobhi stuffed kulcha",
        price: "₹110 (1pc) / ₹200 (2pc)",
        isVeg: true,
      },
      {
        name: "Amritsari Mix Kulcha",
        description: "Mixed stuffed kulcha",
        price: "₹120 (1pc) / ₹240 (2pc)",
        badges: ["recommended"],
        isVeg: true,
      },
    ],
  },

  tandoori_paratha: {
    label: "Tandoori Paratha",
    icon: "🫓",
    subtitle: "Served with Dahi + Chole + Onion + Butter",
    items: [
      {
        name: "Aloo Pyaz Paratha",
        description: "Aloo & pyaz stuffed paratha",
        price: "₹90",
        badges: ["bestseller"],
        isVeg: true,
      },
      {
        name: "Paneer Paratha",
        description: "Rich paneer stuffed paratha",
        price: "₹110",
        badges: ["most_ordered"],
        isVeg: true,
      },
      {
        name: "Gobhi Paratha",
        description: "Fresh gobhi stuffed paratha",
        price: "₹110",
        isVeg: true,
      },
      {
        name: "Paneer Pyaz Paratha",
        description: "Paneer & onion stuffed paratha",
        price: "₹120",
        badges: ["recommended"],
        isVeg: true,
      },
    ],
  },

  main_course: {
    label: "Main Course",
    icon: "🍛",
    subtitle: "Dal, Veg, Paneer, Chaap & Mushroom",
    items: [
      // Dal
      {
        name: "Dal Makhani",
        description: "Rich & creamy black dal",
        price: "₹100 (half) / ₹180 (full)",
        badges: ["bestseller"],
        isVeg: true,
      },
      {
        name: "Yellow Dal Tadka",
        description: "Classic yellow dal with tadka",
        price: "₹90 (half) / ₹170 (full)",
        isVeg: true,
      },
      // Veg
      {
        name: "Aloo Gobhi",
        description: "Classic aloo & gobhi sabzi",
        price: "₹90 (half) / ₹170 (full)",
        isVeg: true,
      },
      {
        name: "Mix Veg",
        description: "Fresh seasonal vegetables",
        price: "₹100 (half) / ₹180 (full)",
        isVeg: true,
      },
      // Paneer
      {
        name: "Paneer Do Pyaza",
        description: "Rich paneer with double onion",
        price: "₹110 (half) / ₹180 (full)",
        isVeg: true,
      },
      {
        name: "Kadai Paneer",
        description: "Spiced kadai paneer",
        price: "₹120 (half) / ₹190 (full)",
        badges: ["bestseller"],
        isVeg: true,
      },
      {
        name: "Palak Paneer",
        description: "Creamy spinach & paneer",
        price: "₹120 (half) / ₹190 (full)",
        badges: ["most_ordered"],
        isVeg: true,
      },
      {
        name: "Paneer Butter Masala",
        description: "Rich butter tomato gravy",
        price: "₹120 (half) / ₹190 (full)",
        badges: ["recommended"],
        isVeg: true,
      },
      {
        name: "Shahi Paneer",
        description: "Royal creamy paneer dish",
        price: "₹120 (half) / ₹190 (full)",
        isVeg: true,
      },
      // Chaap
      {
        name: "Kadai Chaap",
        description: "Spiced kadai soya chaap",
        price: "₹110 (half) / ₹180 (full)",
        isVeg: true,
      },
      {
        name: "Masala Chaap",
        description: "Tangy masala soya chaap",
        price: "₹110 (half) / ₹180 (full)",
        badges: ["bestseller"],
        isVeg: true,
      },
      {
        name: "Chaap Do Pyaza",
        description: "Chaap with double onion",
        price: "₹110 (half) / ₹180 (full)",
        isVeg: true,
      },
      // Mushroom
      {
        name: "Kadai Mushroom",
        description: "Spiced kadai mushroom",
        price: "₹120 (half) / ₹190 (full)",
        isVeg: true,
      },
      {
        name: "Masala Mushroom",
        description: "Tangy masala mushroom",
        price: "₹120 (half) / ₹190 (full)",
        isVeg: true,
      },
      {
        name: "Mushroom Butter Masala",
        description: "Rich butter tomato mushroom",
        price: "₹120 (half) / ₹190 (full)",
        isVeg: true,
      },
    ],
  },

  rice: {
    label: "Rice",
    icon: "🍚",
    subtitle: "",
    items: [
      {
        name: "Steam Rice",
        description: "Plain steamed basmati rice",
        price: "₹60 (half) / ₹100 (full)",
        isVeg: true,
      },
      {
        name: "Jeera Rice",
        description: "Aromatic jeera basmati rice",
        price: "₹70 (half) / ₹120 (full)",
        badges: ["most_ordered"],
        isVeg: true,
      },
      {
        name: "Veg Biryani",
        description: "Fragrant vegetable biryani",
        price: "₹100 (half) / ₹150 (full)",
        badges: ["bestseller"],
        isVeg: true,
      },
    ],
  },

  lassi: {
    label: "Sweet & Lassi",
    icon: "🥛",
    subtitle: "",
    items: [
      {
        name: "Sweet Lassi",
        description: "Chilled sweet yogurt drink",
        price: "₹75",
        badges: ["bestseller"],
        isVeg: true,
      },
      {
        name: "Salted Lassi",
        description: "Refreshing salted lassi",
        price: "₹75",
        isVeg: true,
      },
      {
        name: "Chaas",
        description: "Light spiced buttermilk",
        price: "₹35",
        isVeg: true,
      },
      {
        name: "Gulab Jamun",
        description: "Soft milk dumplings in syrup",
        price: "₹20 (1 pc)",
        isVeg: true,
      },
    ],
  },

  breads: {
    label: "Breads",
    icon: "🫓",
    subtitle: "",
    items: [
      {
        name: "Tandoori Roti",
        description: "Whole wheat tandoor roti",
        price: "₹8",
        isVeg: true,
      },
      {
        name: "Butter Tandoori Roti",
        description: "Butter glazed tandoor roti",
        price: "₹10",
        isVeg: true,
      },
      {
        name: "Plain Roti",
        description: "Soft plain roti",
        price: "₹10",
        isVeg: true,
      },
      {
        name: "Missi Roti",
        description: "Spiced gram flour roti",
        price: "₹15",
        isVeg: true,
      },
      {
        name: "Plain Naan",
        description: "Soft plain naan",
        price: "₹30",
        isVeg: true,
      },
      {
        name: "Butter Naan",
        description: "Butter glazed naan",
        price: "₹35",
        badges: ["bestseller"],
        isVeg: true,
      },
      {
        name: "Stuffed Naan",
        description: "Stuffed naan",
        price: "₹45",
        isVeg: true,
      },
      {
        name: "Garlic Naan",
        description: "Garlic butter naan",
        price: "₹50",
        badges: ["most_ordered"],
        isVeg: true,
      },
      {
        name: "Lachha Paratha",
        description: "Flaky layered paratha",
        price: "₹60",
        badges: ["recommended"],
        isVeg: true,
      },
      {
        name: "Chilli Paratha",
        description: "Spiced chilli paratha",
        price: "₹40",
        isVeg: true,
      },
      {
        name: "Garlic Paratha",
        description: "Garlic flavoured paratha",
        price: "₹40",
        isVeg: true,
      },
      {
        name: "Paneer Paratha",
        description: "Paneer stuffed paratha",
        price: "₹45",
        isVeg: true,
      },
      {
        name: "Rumali Roti",
        description: "Thin soft rumali roti",
        price: "₹10",
        isVeg: true,
      },
      {
        name: "Chur Chur Naan",
        description: "Crispy crushed naan",
        price: "₹70",
        badges: ["chefs_pick"],
        isVeg: true,
      },
    ],
  },

  special_thali: {
    label: "Special Thali",
    icon: "🍽️",
    subtitle: "Lunch & Dinner",
    items: [
      {
        name: "Butter Roti Thali",
        description: "Paneer Dish + Raita + Salad + Chutni",
        price: "₹180",
        isVeg: true,
      },
      {
        name: "Butter Naan Thali",
        description: "Paneer Dish + Dal Makhani + Chutni",
        price: "₹190",
        isVeg: true,
      },
      {
        name: "Aloo Naan Thali",
        description: "Paneer Dish + Dal Makhani + Chutni",
        price: "₹200",
        isVeg: true,
      },
      {
        name: "Aloo Naan Thali (Special)",
        description: "Paneer Dish + Dal Makhani + Chutni",
        price: "₹210",
        isVeg: true,
      },
      {
        name: "Lachha Paratha Thali",
        description: "Premium lachha paratha thali",
        price: "₹180",
        isVeg: true,
      },
      {
        name: "Aloo Chur Chur Naan Thali",
        description: "Aloo stuffed chur chur naan thali",
        price: "₹190",
        isVeg: true,
      },
      {
        name: "Mix Naan Thali",
        description: "Mix naan thali",
        price: "₹220",
        isVeg: true,
      },
      {
        name: "Gobhi Chur Chur Naan Thali",
        description: "Gobhi stuffed chur chur naan thali",
        price: "₹260",
        badges: ["recommended"],
        isVeg: true,
      },
      {
        name: "Mix Chur Chur Naan Thali",
        description: "Mix stuffed chur chur naan thali",
        price: "₹260",
        badges: ["bestseller"],
        isVeg: true,
      },
    ],
  },

  raita_salad: {
    label: "Raita & Salad",
    icon: "🥗",
    subtitle: "",
    items: [
      {
        name: "Boondi Raita",
        description: "Creamy boondi raita",
        price: "₹50",
        isVeg: true,
      },
      {
        name: "Mix Raita",
        description: "Mixed vegetable raita",
        price: "₹50",
        isVeg: true,
      },
      {
        name: "Green Salad",
        description: "Fresh garden salad",
        price: "₹90",
        isVeg: true,
      },
      {
        name: "Papad",
        description: "Crispy papad",
        price: "₹10 (1pc) / ₹110 (plate)",
        isVeg: true,
      },
    ],
  },

  soft_drinks: {
    label: "Soft Drinks",
    icon: "🥤",
    subtitle: "",
    items: [
      {
        name: "Cold Drink",
        description: "Assorted cold drinks",
        price: "MRP",
        isVeg: true,
      },
      {
        name: "Water",
        description: "Mineral water",
        price: "MRP",
        isVeg: true,
      },
    ],
  },
};

// Category gradient per key
const CATEGORY_GRADIENT: Record<Exclude<CategoryKey, "all">, string> = {
  breakfast:
    "linear-gradient(135deg, rgba(255,122,24,0.28), rgba(245,197,66,0.12))",
  amritsari_kulcha:
    "linear-gradient(135deg, rgba(245,197,66,0.28), rgba(232,160,32,0.12))",
  tandoori_paratha:
    "linear-gradient(135deg, rgba(255,122,24,0.22), rgba(245,197,66,0.10))",
  main_course:
    "linear-gradient(135deg, rgba(245,197,66,0.22), rgba(255,122,24,0.12))",
  rice: "linear-gradient(135deg, rgba(34,197,94,0.18), rgba(245,197,66,0.10))",
  lassi:
    "linear-gradient(135deg, rgba(168,85,247,0.22), rgba(245,197,66,0.10))",
  breads:
    "linear-gradient(135deg, rgba(251,191,36,0.22), rgba(245,197,66,0.10))",
  special_thali:
    "linear-gradient(135deg, rgba(245,197,66,0.30), rgba(255,122,24,0.18))",
  raita_salad:
    "linear-gradient(135deg, rgba(34,197,94,0.18), rgba(245,197,66,0.08))",
  soft_drinks:
    "linear-gradient(135deg, rgba(59,130,246,0.18), rgba(245,197,66,0.08))",
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
  const [activeTab, setActiveTab] = useState<CategoryKey>("breakfast");
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

        {/* Order via platform CTA strip */}
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
    </section>
  );
}
