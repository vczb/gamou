import companyData from '@/__mock__/company';
import inventoryData from '@/__mock__/inventory';

export const getCompanyBySlug = (slug: string) => {
  return companyData.find(item => item.slug === slug);
}

export const getInventoryByCompanySlug = (slug: string) => {
  return inventoryData.find(item => item.company_slug === slug);
}
