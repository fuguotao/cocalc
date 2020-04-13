/* 
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

import { Table } from "./types";

Table({
  name: "file_access_log",
  rules: {
    primary_key: "id",
    durability: "soft", // loss of some log data not serious, since used only for analytics
    pg_indexes: ["project_id", "account_id", "filename", "time"],
  },
  fields: {
    id: {
      type: "uuid",
    },
    project_id: {
      type: "uuid",
    },
    account_id: {
      type: "uuid",
    },
    filename: {
      type: "string",
    },
    time: {
      type: "timestamp",
    },
  },
});
