export interface APIRequestStatus {
    status: 'loading' | 'success' | 'error';
    message?: string;
}