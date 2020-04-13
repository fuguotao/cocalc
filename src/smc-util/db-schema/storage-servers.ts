/* 
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

import { Table } from "./types";

Table({
  name: "storage_servers",
  rules: {
    primary_key: "host",
  },
  fields: {
    host: {
      type: "string",
      desc: "hostname of the storage server",
      pg_type: "VARCHAR(63)",
    },
  },
});
