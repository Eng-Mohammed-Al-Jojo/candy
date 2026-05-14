import React, {
  useCallback,
} from "react";
import { type Item } from "./Menu";
import { FaFire } from "react-icons/fa";
import { motion } from "framer-motion";
import { FiShoppingCart } from "react-icons/fi";

interface Props {
  item: Item;
  orderSystem: boolean;
  onClick?: (item: Item) => void;
  onDetailsClick?: (item: Item) => void;
}

const ItemRow = React.memo(
  ({ item, orderSystem, onClick }: Props) => {

    const prices = String(item.price).split(",");
    const basePrice = Number(prices[0]);
    const unavailable = item.visible === false;
    const itemName = item.nameAr || item.name || "";
    const description = item.ingredientsAr || item.ingredients || "";
    const canOrder = !unavailable && orderSystem;
    const handleOrderClick = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (canOrder) onClick?.(item);
      },
      [canOrder, item, onClick]
    );

    return (
      <motion.div
        className={`
          relative flex items-center justify-between w-full rounded-3xl border
          h-[110px] pr-27 pl-4 bg-white
          transition-all duration-300 group
          ${unavailable
            ? "opacity-40 grayscale cursor-not-allowed border-gray-100 bg-gray-50/30 pointer-events-none"
            : "border-primary-200 hover:bg-gray-50/50 cursor-pointer"
          }
        `}
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onClick={handleOrderClick}
      >
        {/* IMAGE (RIGHT SIDE, ABSOLUTE, OVERFLOW) */}
        <div className="absolute right-10 translate-x-1/2 w-28 h-28 z-10">
          <img
            src={item.image ? `/images/${item.image}` : "/logo.png"}
            alt={itemName}
            loading="lazy"
            className="w-full h-full rounded-full object-cover shadow-md border-2 border-primary-500 transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/logo.png";
            }}
          />

          {/* SOLD OUT OVERLAY */}
          {unavailable && (
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center">
              <span className="text-[10px] font-black text-white text-center leading-tight">
                لقد نفذت<br />الكمية
              </span>
            </div>
          )}

          {/* FEATURED BADGE */}
          {(item.star || (item as any).isFeatured) && !unavailable && (
            <div className="absolute -top-1 -right-1 bg-[#B7303E] text-white p-1.5 rounded-full shadow-lg border-2 border-white animate-bounce">
              <FaFire size={10} />
            </div>
          )}
        </div>

        {/* CONTENT (CENTER-RIGHT) */}
        <div className="flex-1 text-right overflow-hidden">
          <h3 className="text-md md:text-lg lg:text-xl font-bold text-gray-900 mb-1 leading-tight truncate">
            {itemName}
          </h3>
          <p className="text-[11px] md:text-xs lg:text-sm text-gray-500 line-clamp-2 leading-relaxed font-medium">
            {description}
          </p>
        </div>

        {/* LEFT SECTION (PRICE + BUTTON) */}
        <div className="flex flex-col items-end gap-2.5 shrink-0 min-w-[90px] pl-2">
          <div className={`font-black text-xl flex items-center gap-0.5 ${unavailable ? "text-gray-400 line-through" : "text-[#355152]"}`}>
            <span className="text-sm font-bold opacity-60">₪</span>
            {basePrice}
          </div>

          {canOrder && (
            <button
              onClick={handleOrderClick}
              className="bg-[#B7303E] hover:bg-[#a02a36] text-white px-4 py-2.5 rounded-full text-xs font-black shadow-lg shadow-[#B7303E]/20 transition-all active:scale-95 uppercase tracking-wider whitespace-nowrap"
            >
              <FiShoppingCart size={14} />
            </button>
          )}

          {unavailable && (
            <span className="bg-red-50 text-red-400 border border-red-200 px-3 py-1 rounded-full text-[10px] font-bold whitespace-nowrap">
              لقد نفذت الكمية
            </span>
          )}
        </div>
      </motion.div>
    );
  }
);

export default ItemRow;
