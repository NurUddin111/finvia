export interface IAuthProvider {
  provider: "credentials" | "google";
  providerId: string;
}
