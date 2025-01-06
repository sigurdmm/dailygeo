export const fetchGeoGuessrApi = async <T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  apiToken: string,
  body?: unknown
): Promise<T> => {
  const baseUrl = "https://www.geoguessr.com/api/v3";

  const fetchOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      Cookie: `_ncfa=${apiToken}`,
    },
    ...(body && method !== "GET" ? { body: JSON.stringify(body) } : {}),
  };

  console.log("fetch init")

  const response = await fetch(`${baseUrl}${endpoint}`, fetchOptions);
  console.log("fetch complete")

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
  }

  return (await response.json()) as T;
};


export const upsertData = async (supabase, table: string, data: any[]) => {
  const { error } = await supabase.from(table).upsert(data);
  if (error) {
    console.error(`Error inserting/updating ${table}:`, error.message);
    throw new Error(`Error inserting/updating ${table}: ${error.message}`);
  }
};

