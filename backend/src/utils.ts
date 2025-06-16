import csv from "csvtojson";

export async function getTableJson(csvFilePath: string): Promise<object> {
  return await csv().fromFile(csvFilePath);
}
