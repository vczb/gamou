import { selectCompanyBySlugModel, selectInventoryByCompanySlugModel } from "@/models/store";
import { serverError, ok, unprocessableEntity } from "@/utils/http-helpers";

export const fetchStoreBySlug = async ({ slug }: { slug: string }) => {
  try {
    const company = await selectCompanyBySlugModel({ slug });
    const inventory = await selectInventoryByCompanySlugModel({ slug });

    if (!company || !inventory) {
      return unprocessableEntity("Company or inventory not found.");
    }

    return ok("Store data retrieved successfully", {
      ...company,
      ...inventory,
    });
  } catch (error) {
    console.error("Error fetching store by slug:", error);
    return serverError("Internal server error.");
  }
};

export const fetchInventoryByQuery = async ({
  slug,
  query,
}: {
  slug: string;
  query: string;
}) => {
  try {
    const inventory = await selectInventoryByCompanySlugModel({ slug });

    if (!inventory) {
      return unprocessableEntity("Inventory not found.");
    }

    // Assuming query is used to filter inventory, add your filtering logic here

    return ok("Inventory data retrieved successfully", inventory);
  } catch (error) {
    console.error("Error fetching inventory by query:", error);
    return serverError("Internal server error.");
  }
};
