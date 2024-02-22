export interface IProduct {
  _id: string;
  name: string;
  category: string;
  price: number;
  imageUrls: string[];
  rating:Array<number>
}
export interface IApiResponse<T> {
  status: string;
  data: T;
  message?: string;
  // Add other properties as needed
}
export const fetcher = async <T>(url: string): Promise<T> => {
  try {
    const response = await fetch(url);
    const data: IApiResponse<T> = await response.json();

    if (data.status === 'error') {
      throw new Error('retrieving error');
    }

    return data.data;
  } catch (err: any) {
    throw new Error(err);
  }
};
export const postFetcher = async <T>(url: string, payload: string): Promise<T> => {
  try {
    const response = await fetch(url, {
      body: payload,
      method:"POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json"
      }
    }
    );
    const data: IApiResponse<T> = await response.json();

    if (data.status === 'error') {
      if (data.message) {
        throw { message: data.message};
      }
    }

    return data.data;
  } catch (err: any) {
    throw new Error(err);
  }
};
