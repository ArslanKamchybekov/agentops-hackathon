"use server"

interface QueryInput {
  input_text: string
  city?: string
  country?: string
  search_context_size?: string // Changed from number to string
}

interface QueryResponse {
  response: string
}

export async function queryWeather(data: QueryInput): Promise<QueryResponse> {
  // Ensure search_context_size is one of the expected values
  if (data.search_context_size && !["low", "medium", "high"].includes(data.search_context_size)) {
    // Default to medium if an invalid value is provided
    data.search_context_size = "medium"
  }

  try {
    const response = await fetch("http://127.0.0.1:8000/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Failed to query weather: ${response.status} ${errorText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error in queryWeather:", error)
    throw new Error(error instanceof Error ? error.message : "Unknown error occurred")
  }
}

