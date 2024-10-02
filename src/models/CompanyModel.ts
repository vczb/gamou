import connection from "@/database/connection";
import { BaseModel } from "./BaseModel";
import { Company } from "@/types/company";

export class CompanyModel extends BaseModel<Company> {
  constructor() {
    super("companies");
  }
}
