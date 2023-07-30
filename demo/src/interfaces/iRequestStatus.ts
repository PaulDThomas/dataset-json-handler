export interface iRequestStatus<T> {
  requesting: boolean;
  requestingId?: T;
  requestedId?: T;
  error: boolean;
  errorText?: string;
  cancel?: () => void;
}
