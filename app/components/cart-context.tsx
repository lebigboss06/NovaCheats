"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "../data/products";

type CartItem = {
  key: string;
  slug: string;
  name: string;
  image: string;
  duration: string;
  unitPrice: number;
  quantity: number;
};

type AddItemOptions = {
  duration?: string;
  price?: number;
  quantity?: number;
};

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  addItem: (product: Product, options?: AddItemOptions) => void;
  removeItem: (itemKey: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
};

const STORAGE_KEY = "novacheats_cart";
const CartContext = createContext<CartContextValue | null>(null);

function parsePrice(price: string): number {
  const normalized = price.replace(/\s/g, "").replace("€", "").replace("EUR", "").replace(",", ".");
  const parsed = Number(normalized.replace(/[^0-9.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR"
  }).format(price);
}

function createCartKey(slug: string, duration: string): string {
  return `${slug}::${duration}`;
}

function normalizeStoredItem(item: Partial<CartItem> & { price?: string }): CartItem | null {
  if (!item.slug || !item.name) {
    return null;
  }

  const duration = item.duration && item.duration.trim().length > 0 ? item.duration : "Standard";
  const unitPrice =
    typeof item.unitPrice === "number"
      ? item.unitPrice
      : typeof item.price === "string"
        ? parsePrice(item.price)
        : 0;

  const quantity = typeof item.quantity === "number" && item.quantity > 0 ? item.quantity : 1;

  return {
    key: item.key ?? createCartKey(item.slug, duration),
    slug: item.slug,
    name: item.name,
    image: item.image ?? "",
    duration,
    unitPrice,
    quantity
  };
}

function CartPanel({
  isOpen,
  items,
  totalPrice,
  onClose,
  onClear,
  onRemove
}: {
  isOpen: boolean;
  items: CartItem[];
  totalPrice: number;
  onClose: () => void;
  onClear: () => void;
  onRemove: (itemKey: string) => void;
}) {
  return (
    <>
      {isOpen ? (
        <button
          type="button"
          aria-label="Fermer le panier"
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/65 backdrop-blur-[2px]"
        />
      ) : null}

      <aside
        className={`fixed right-0 top-0 z-[60] h-full w-full max-w-md transform border-l border-violet-300/20 bg-black/80 p-5 backdrop-blur-xl transition duration-300 sm:p-6 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-5 flex items-center justify-between">
          <p className="font-[var(--font-orbitron)] text-2xl text-violet-100">Panier</p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-violet-300/30 bg-violet-500/15 px-3 py-1 text-xs text-violet-100"
          >
            Fermer
          </button>
        </div>

        <div className="space-y-3 overflow-y-auto pb-44">
          {items.length === 0 ? (
            <div className="rounded-xl border border-violet-300/20 bg-violet-500/10 p-4 text-sm text-violet-100/80">
              Aucun article dans le panier.
            </div>
          ) : (
            items.map((item) => (
              <div key={item.key} className="rounded-xl border border-violet-300/25 bg-black/45 p-4">
                <p className="font-semibold text-violet-100">{item.name}</p>
                <p className="mt-1 text-sm text-violet-200/80">{formatPrice(item.unitPrice)}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-cyan-200/90">Duree: {item.duration}</p>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-sm text-cyan-200">Quantite: {item.quantity}</p>
                  <button
                    type="button"
                    onClick={() => {
                      onRemove(item.key);
                    }}
                    className="rounded-md border border-fuchsia-300/30 bg-fuchsia-500/10 px-3 py-1 text-xs text-fuchsia-100 transition hover:bg-fuchsia-500/20"
                  >
                    Supprimer
                  </button>
                </div>
                <p className="mt-2 text-right text-sm text-violet-200/90">
                  Total: {formatPrice(item.unitPrice * item.quantity)}
                </p>
              </div>
            ))
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t border-violet-300/20 bg-black/90 p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-violet-200/85">Total</span>
            <span className="font-[var(--font-orbitron)] text-xl text-violet-100">{formatPrice(totalPrice)}</span>
          </div>
          <button
            type="button"
            onClick={onClear}
            className="w-full rounded-lg border border-violet-300/30 bg-violet-500/15 px-4 py-2.5 font-semibold text-violet-100 transition hover:bg-violet-500/25"
          >
            Vider le panier
          </button>
        </div>
      </aside>
    </>
  );
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return [];
      }
      const parsed = JSON.parse(raw) as Array<Partial<CartItem> & { price?: string }>;
      if (!Array.isArray(parsed)) {
        return [];
      }
      return parsed.map((item) => normalizeStoredItem(item)).filter((item): item is CartItem => item !== null);
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

    return {
      items,
      totalItems,
      totalPrice,
      isOpen,
      addItem: (product: Product, options?: AddItemOptions) => {
        const duration = options?.duration ?? "Standard";
        const unitPrice = options?.price ?? parsePrice(product.price);
        const quantityToAdd = Math.max(1, Math.floor(options?.quantity ?? 1));
        const key = createCartKey(product.slug, duration);

        setItems((prev) => {
          const existing = prev.find((item) => item.key === key);
          if (!existing) {
            return [
              ...prev,
              {
                key,
                slug: product.slug,
                name: product.name,
                image: product.image,
                duration,
                unitPrice,
                quantity: quantityToAdd
              }
            ];
          }
          return prev.map((item) =>
            item.key === key
              ? {
                  ...item,
                  quantity: item.quantity + quantityToAdd
                }
              : item
          );
        });
      },
      removeItem: (itemKey: string) => {
        setItems((prev) => prev.filter((item) => item.key !== itemKey));
      },
      clearCart: () => {
        setItems([]);
      },
      openCart: () => {
        setIsOpen(true);
      },
      closeCart: () => {
        setIsOpen(false);
      }
    };
  }, [items, isOpen]);

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartPanel
        isOpen={value.isOpen}
        items={value.items}
        totalPrice={value.totalPrice}
        onClose={value.closeCart}
        onClear={value.clearCart}
        onRemove={value.removeItem}
      />
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
