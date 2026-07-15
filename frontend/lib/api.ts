const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export class ApiClient {
  private static async request<T = any>(
    path: string,
    method: "GET" | "POST" | "PATCH" | "DELETE",
    body?: any
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${path}`;
    const headers = {
      "Content-Type": "application/json"
    };

    const options: RequestInit = {
      method,
      headers
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      
      if (!response.ok) {
        return {
          success: false,
          error: data.error || `HTTP error status ${response.status}`,
          message: data.message
        };
      }

      return {
        success: true,
        message: data.message,
        data: data.data
      };
    } catch (error) {
      console.error(`API Request failure on ${method} ${path}:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Network error"
      };
    }
  }

  static async get<T = any>(path: string): Promise<ApiResponse<T>> {
    return this.request<T>(path, "GET");
  }

  static async post<T = any>(path: string, body: any): Promise<ApiResponse<T>> {
    return this.request<T>(path, "POST", body);
  }

  static async patch<T = any>(path: string, body: any): Promise<ApiResponse<T>> {
    return this.request<T>(path, "PATCH", body);
  }

  static async delete<T = any>(path: string): Promise<ApiResponse<T>> {
    return this.request<T>(path, "DELETE");
  }

  static async upload<T = any>(file: File): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}/upload`;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      
      if (!response.ok) {
        return {
          success: false,
          error: data.error || `HTTP error status ${response.status}`,
          message: data.message
        };
      }

      return {
        success: true,
        message: data.message,
        data: data.data
      };
    } catch (error) {
      console.error(`API Upload failure:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Network error"
      };
    }
  }
}
