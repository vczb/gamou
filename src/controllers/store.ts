import { getCompanyBySlug, getInventoryByCompanySlug } from "@/models/store";

export const getStoreBySlug = async ({slug}:{slug: string}) => {
 
  const company = getCompanyBySlug(slug)
  const inventory = getInventoryByCompanySlug(slug) 

  return {
    ...company,
    ...inventory
  }
}
