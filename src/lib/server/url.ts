interface Fields {
  metadata: boolean;
  staking: boolean;
  balance: boolean;
  pricing: boolean;
  address: string;
}

interface Query {
  [key: string]: string | string[];
}

export function queryToString(q: string | string[]): string {
  return Array.isArray(q) ? q.join(",") : q;
}

export function parseFields(query: Query): Fields {
  let data = queryToString(query.fields);
  data = data ?? "";

  const parsed = data.split(",").map((f) => f.trim().toLocaleLowerCase());
  const obj: Fields = {
    metadata: false,
    pricing: false,
    balance: false,
    staking: false,
    address: "",
  };

  if (parsed.includes("metadata")) {
    obj.metadata = true;
  }

  if (parsed.includes("pricing")) {
    obj.pricing = true;
  }

  if (parsed.includes("staking") && query.address) {
    obj.staking = true;
    obj.address = queryToString(query.address);
  }

  if (parsed.includes("balance") && query.address) {
    obj.balance = true;
    obj.address = queryToString(query.address);
  }
  return obj;
}
