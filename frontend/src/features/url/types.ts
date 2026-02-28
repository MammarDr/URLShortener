export interface IUrl {
  id: string;
  source: string;
  shortCode: string;
  title: string;
  visitCount: number;
  createdAt: Date;
  expiresAt: Date | null;
  lastModified: Date;
  isActive: boolean;
}

export interface ICreateUrlDTO {
  source: string;
  title: string;
  slug?: string;
  active?: boolean;
}

export interface IUrlResponse {
  data: IUrl[];
  pagination: null | {
    CurrentPage: number;
    PageSize: number;
    TotalPages: number;
    TotalCount: number;
    HasNext: boolean;
    HasPrevious: boolean;
  };
}
