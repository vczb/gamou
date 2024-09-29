import { Company } from "@/types/company";
import connection from "@/database/connection"; 


export const selectCompanyModel = async (
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


export const updateCompanyModel = async (
  id: number,
  data: Partial<Company>
): Promise<Company | undefined> => {
  try {
    const [updatedCompany] = await connection<Company>("companies")
      .where({ id })
      .update(data)
      .returning("*"); 

    return updatedCompany || undefined;
  } catch (error) {
    console.error("Error updating company:", error);
    throw error;
  }
};
