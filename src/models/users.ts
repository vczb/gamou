import connection from "@/database/connection";

export const tetsConnection = async () => {
  const data = await connection("users").count();
  console.log(data);
}