import { Company } from "@/types/company";
import connection from "@/database/connection"; // Adjust the path to your Knex connection

/**
 * Query a single company based on provided criteria.
 * @param {Partial<Company>} props - The properties to filter the company.
 * @returns {Promise<Company | undefined>} - Returns the company if found, otherwise undefined.
 */
export const queryCompany = async (
  props: Partial<Company>
): Promise<Company | undefined> => {
  try {
    const company = await connection<Company>("companies").where(props).first();
    return company || undefined;
  } catch (error) {
    console.error("Error querying company:", error);
    throw error;
  }
};

/**
 * Update a company record with new data.
 * @param {number} id - The ID of the company to update.
 * @param {Partial<Company>} data - The data to update the company with.
 * @returns {Promise<Company | undefined>} - Returns the updated company if successful.
 */
export const editCompany = async (
  id: number,
  data: Partial<Company>
): Promise<Company | undefined> => {
  try {
    const [updatedCompany] = await connection<Company>("companies")
      .where({ id })
      .update(data)
      .returning("*"); // Ensure your DB supports 'returning'

    return updatedCompany || undefined;
  } catch (error) {
    console.error("Error updating company:", error);
    throw error;
  }
};
