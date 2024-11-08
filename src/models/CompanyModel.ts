import connection from "@/database/connection";
import { BaseModel } from "./BaseModel";
import { Company } from "@/types/company";
import { deleteFile } from "@/utils/file";

export class CompanyModel extends BaseModel<Company> {
  constructor() {
    super("companies");
  }

  async selectPrimaryCompanyWithSettingsByUserId(id: number) {
    return await connection("companies")
      .leftJoin(
        "company_settings",
        "companies.id",
        "company_settings.company_id"
      )
      .select(
        "companies.*", // Select all columns from the companies table
        "company_settings.products_has_variants" // Select specific field from company_settings
      )
      .where({
        "companies.user_id": id,
        "companies.sequence": 1, // Ensures that sequence is always 1
      })
      .first(); // Fetch only one record since we're filtering by ID
  }

  async selectPrimaryCompanyWithSettingsBySlug(slug: string) {
    return await connection("companies")
      .leftJoin(
        "company_settings",
        "companies.id",
        "company_settings.company_id"
      )
      .select(
        "companies.*", // Select all columns from the companies table
        "company_settings.products_has_variants" // Select specific field from company_settings
      )
      .where({
        "companies.slug": slug,
        "companies.active": true,
        "companies.sequence": 1, // Ensures that sequence is always 1
      })
      .first(); // Fetch only one record since we're filtering by ID
  }

  async updateCompanyWithSettingsAndDeletePrevImage(
    id: number,
    data: Partial<Company>
  ) {
    const transaction = await connection.transaction();

    try {
      const { products_has_variants, ...companyData } = data;

      // Fetch the current company to get the existing image URL
      const [existingCompany] = await transaction("companies")
        .where({ id })
        .select("image");

      // Update the company with the new data
      const [updatedCompany] = await transaction("companies")
        .where({ id })
        .update(companyData)
        .returning("*");

      await connection("company_settings")
        .insert({
          company_id: id,
          products_has_variants: products_has_variants || false,
        })
        .onConflict("company_id")
        .merge({
          products_has_variants: products_has_variants, // Only update the settings field
        });

      // Commit the transaction before performing the image deletion
      await transaction.commit();

      // If the company had an old image and a new image is being uploaded, delete the old image
      if (
        existingCompany.image &&
        companyData.image &&
        existingCompany.image !== companyData.image
      ) {
        const path = process.cwd() + "/public/" + existingCompany.image;
        await deleteFile(path);
      }

      return updatedCompany || undefined;
    } catch (error) {
      // Rollback the transaction if something goes wrong
      await transaction.rollback();
      console.error(
        "Error updating company with settings and deleting previous image:",
        error
      );
      throw error;
    }
  }

  async deleteCompanyAndImage(id: number) {
    const transaction = await connection.transaction();

    try {
      const [existingCompany] = await transaction("companies")
        .where({ id })
        .select("image");

      const result = await connection("companies").where({ id }).del();

      await transaction.commit();

      if (existingCompany.image) {
        const path = process.cwd() + "/public/" + existingCompany.image;
        await deleteFile(path);
      }

      return result;
    } catch (error) {
      console.error("Error deleting company and image:", error);
      throw error;
    }
  }
}
