export interface APIRequestStatus {
    status: 'not_started' | 'loading' | 'success' | 'error';
    message?: string;
}

export enum APIRequestStatusEnum {
    NOT_STARTED = 'not_started',
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}