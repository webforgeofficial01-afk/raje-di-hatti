import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Review {
    id: bigint;
    review: string;
    name: string;
    createdAt: bigint;
    rating: bigint;
}
export interface Order {
    customerName: string;
    status: string;
    total: bigint;
    paymentMethod: string;
    orderId: string;
    address: string;
    timestamp: bigint;
    phone: string;
    items: string;
}
export interface GalleryItem {
    id: bigint;
    title: string;
    creator: Principal;
    description: string;
    timestamp: Time;
    image: ExternalBlob;
}
export type Time = bigint;
export interface OrderInput {
    customerName: string;
    total: bigint;
    paymentMethod: string;
    address: string;
    phone: string;
    items: string;
}
export interface Submission {
    name: string;
    email: string;
    message: string;
    timestamp: Time;
    phone?: string;
}
export interface ReviewInput {
    review: string;
    name: string;
    rating: bigint;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addGalleryItem(image: ExternalBlob, title: string, description: string): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteGalleryItem(id: bigint): Promise<void>;
    deleteReview(id: bigint): Promise<void>;
    getAllGalleryItems(): Promise<Array<GalleryItem>>;
    getAllReviews(): Promise<Array<Review>>;
    getAllSubmissions(): Promise<Array<Submission>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getGalleryItem(id: bigint): Promise<GalleryItem | null>;
    getLatestReviews(limit: bigint): Promise<Array<Review>>;
    getOrderById(orderId: string): Promise<Order | null>;
    getReviewInputs(): Promise<Array<ReviewInput>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitContactForm(name: string, phone: string | null, email: string, message: string): Promise<void>;
    submitOrder(input: OrderInput): Promise<string>;
    submitReview(name: string, rating: bigint, review: string): Promise<bigint>;
}
