export interface FetcherProps {
    limit?: number;
    offset?: number;
    isSuccess: boolean;
    isLoading: boolean;
    isError: boolean;
    error: string;
    refetch: () => void;
}
