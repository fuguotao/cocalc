/* 
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

import { Table } from "./types";

Table({
  name: "compute_servers",
  rules: {
    primary_key: "host",
  },
  fields: {
    host: {
      type: "string",
      pg_type: "VARCHAR(63)",
    },
    dc: {
      type: "string",
    },
    port: {
      type: "integer",
    },
    secret: {
      type: "string",
    },
    experimental: {
      type: "boolean",
    },
    member_host: {
      type: "boolean",
    },
    status: {
      type: "map",
      desc: "something like {stuff:?,...,timestamp:?}",
      date: ["timestamp"],
    },
  },
});
