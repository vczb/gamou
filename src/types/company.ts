type Settings = {
  products_has_variants?: boolean
}

export type Company = {
  id: number;
  description?: string;
  image?: string;
  phone?: string;
  slug: string;
  name: string;
  active: boolean;
  currency: string;
  user_id: number;
  sequence: number;
} & Settings
