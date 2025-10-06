export interface Player {
  name: string;
  avatar: string;
  event: string;
}

export interface LoginResponse {
  status: "success" | "fail";
  player?: Player;
  error?: string;
}


export interface Game {
  name: string;
  description: string;
  code: string;
  icon: string;
  categoryIds: number[];
}

export interface Category {
  id: number;
  name: string;
}