import { AttributeVariantProps } from "@/components/AttributeVariant";

export interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  amount: number;
  category_id: number;
  categoryTitle?: string;
  categoryImage?: string;
  company_id: number;
  active: boolean;
  created_at: Date;
  updated_at: Date;
  variants?: AttributeVariantProps[]
}
