export interface StreamCallbacks {
  onComplete?: () => void;
  onToken: (token: string) => void;
  onError?: (error: Error) => void;
}
