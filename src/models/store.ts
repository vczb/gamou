import companyData from '@/__mock__/company';
import inventoryData from '@/__mock__/inventory';


export const selectCompanyBySlugModel = async ({ slug }: { slug: string }): Promise<object | undefined> => {
  try {
    const company = companyData.find(item => item.slug === slug);
    return company || undefined;
  } catch (error) {
    console.error("Error getting company by slug:", error);
    throw error;
  }
};


export const selectInventoryByCompanySlugModel = async ({ slug }: { slug: string }): Promise<object | undefined> => {
  try {
    const inventory = inventoryData.find(item => item.company_slug === slug);
    return inventory || undefined;
  } catch (error) {
    console.error("Error getting inventory by company slug:", error);
    throw error;
  }
};
