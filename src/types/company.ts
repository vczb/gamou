export type Company = {
  id: number;
  description?: string;
  image?: string;
  slug: string;
  name: string;
  active: boolean;
  currency: string;
  user_id: number;
  company_sequence: number;
};
