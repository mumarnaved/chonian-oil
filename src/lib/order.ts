export const provinces = [
  "Punjab",
  "Sindh",
  "Khyber Pakhtunkhwa",
  "Balochistan",
  "Islamabad Capital Territory",
  "Gilgit-Baltistan",
  "Azad Jammu & Kashmir",
] as const;

export type OrderInput = {
  name: string;
  phone: string;
  email?: string;
  address: string;
  address2?: string;
  city: string;
  postalCode?: string;
  province: string;
  notes?: string;
  quantity: number;
  paymentMethod: "cod";
};

export type OrderErrors = Partial<Record<keyof OrderInput, string>>;

// Pakistani mobile: 03XXXXXXXXX or +923XXXXXXXXX (spaces/dashes allowed)
const PK_PHONE = /^(\+92|0092|0)3\d{9}$/;

export function validateOrder(input: Partial<OrderInput>): OrderErrors {
  const e: OrderErrors = {};
  if (!input.name || input.name.trim().length < 2) e.name = "Please enter your full name.";
  const phone = (input.phone ?? "").replace(/[\s-]/g, "");
  if (!PK_PHONE.test(phone)) e.phone = "Enter a valid mobile number, e.g. 0300 1234567.";
  if (input.email && !/^\S+@\S+\.\S+$/.test(input.email)) e.email = "That email doesn't look right.";
  if (!input.address || input.address.trim().length < 8) e.address = "Please enter your full delivery address.";
  if (input.postalCode && !/^\d{5}$/.test(input.postalCode.trim())) e.postalCode = "Postal code is 5 digits, e.g. 54000.";
  if (!input.city || input.city.trim().length < 2) e.city = "Please enter your city.";
  if (!input.province || !provinces.includes(input.province as (typeof provinces)[number]))
    e.province = "Please choose your province.";
  if (!input.quantity || input.quantity < 1 || input.quantity > 20) e.quantity = "Quantity must be between 1 and 20.";
  return e;
}
