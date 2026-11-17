"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { product, shippingFor } from "@/lib/store";

type CartState = {
  quantity: number;
  ready: boolean;
  drawerOpen: boolean;
  subtotal: number;
  shippingFee: number;
  total: number;
  add: (qty?: number) => void;
  setQuantity: (qty: number) => void;
  clear: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
};

const CartContext = createContext<CartState | null>(null);
const STORAGE_KEY = "chonions-oil-cart";
const MAX_QTY = 20;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [quantity, setQty] = useState(0);
  const [ready, setReady] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Load the saved cart once on the client.
  // Reading browser storage after mount keeps server and client HTML identical.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      const saved = Number(localStorage.getItem(STORAGE_KEY));
      if (Number.isFinite(saved) && saved > 0) setQty(Math.min(saved, MAX_QTY));
    } catch {}
    setReady(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, String(quantity));
    } catch {}
  }, [quantity, ready]);

  const value = useMemo<CartState>(() => {
    const subtotal = quantity * product.price;
    const shippingFee = shippingFor(subtotal);
    return {
      quantity,
      ready,
      drawerOpen,
      subtotal,
      shippingFee,
      total: subtotal + shippingFee,
      add: (qty = 1) => {
        setQty((q) => Math.min(q + qty, MAX_QTY));
        setDrawerOpen(true);
      },
      setQuantity: (qty) => setQty(Math.max(0, Math.min(qty, MAX_QTY))),
      clear: () => setQty(0),
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
    };
  }, [quantity, ready, drawerOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
