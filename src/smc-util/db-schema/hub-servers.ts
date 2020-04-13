/* 
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

import { Table } from "./types";

Table({
  name: "hub_servers",
  rules: {
    primary_key: "host",
    durability: "soft", // loss of some log data not serious, since ephemeral and expires quickly anyways
  },
  fields: {
    host: {
      type: "string",
      pg_type: "VARCHAR(63)",
    },
    port: {
      type: "integer",
    },
    clients: {
      type: "integer",
    },
    expire: {
      type: "timestamp",
    },
  },
});
