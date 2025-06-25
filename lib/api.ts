// lib/api.ts

const BASE_URL = 'https://picsum.photos/v2/list';

interface Photo {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export const fetchImages = async (page: number, limit: number): Promise<Photo[]> => {
  try {
    const response = await fetch(`${BASE_URL}?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Photo[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
};