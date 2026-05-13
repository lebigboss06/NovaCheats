"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "../data/products";

type CartItem = {
  slug: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (slug: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
};

const STORAGE_KEY = "novacheats_cart";
const CartContext = createContext<CartContextValue | null>(null);

function parsePrice(price: string): number {
  const parsed = Number(price.replace(/[^0-9.]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR"
  }).format(price);
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
  onRemove: (slug: string) => void;
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
              <div key={item.slug} className="rounded-xl border border-violet-300/25 bg-black/45 p-4">
                <p className="font-semibold text-violet-100">{item.name}</p>
                <p className="mt-1 text-sm text-violet-200/80">{item.price}</p>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-sm text-cyan-200">Quantite: {item.quantity}</p>
                  <button
                    type="button"
                    onClick={() => {
                      onRemove(item.slug);
                    }}
                    className="rounded-md border border-fuchsia-300/30 bg-fuchsia-500/10 px-3 py-1 text-xs text-fuchsia-100 transition hover:bg-fuchsia-500/20"
                  >
                    Supprimer
                  </button>
                </div>
                <p className="mt-2 text-right text-sm text-violet-200/90">
                  Total: {formatPrice(parsePrice(item.price) * item.quantity)}
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
      const parsed = JSON.parse(raw) as CartItem[];
      return Array.isArray(parsed) ? parsed : [];
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
    const totalPrice = items.reduce((acc, item) => acc + parsePrice(item.price) * item.quantity, 0);

    return {
      items,
      totalItems,
      totalPrice,
      isOpen,
      addItem: (product: Product) => {
        setItems((prev) => {
          const existing = prev.find((item) => item.slug === product.slug);
          if (!existing) {
            return [
              ...prev,
              {
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
              }
            ];
          }
          return prev.map((item) =>
            item.slug === product.slug
              ? {
                  ...item,
                  quantity: item.quantity + 1
                }
              : item
          );
        });
      },
      removeItem: (slug: string) => {
        setItems((prev) => prev.filter((item) => item.slug !== slug));
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
