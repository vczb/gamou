import { getCompanyBySlug, getInventoryByCompanySlug } from "@/models/store";

export const getStoreBySlug = async ({slug}:{slug: string}) => {
 
  const company = getCompanyBySlug(slug)
  const inventory = getInventoryByCompanySlug(slug) 

  return {
    ...company,
    ...inventory
  }
}

export const getInventoryByQuery = async ({slug, query}:{slug: string, query: string}) => {
  const inventory = getInventoryByCompanySlug(slug) 

}