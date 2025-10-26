import useSWR from "swr";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetcher = (...args: Parameters<typeof fetch>): Promise<any> =>
  fetch(...args).then((res) => res.json());

export function useQuestion({ status }: { status: string }) {
  const { data, error, isLoading } = useSWR(
    `/api/questions/status/${status}`,
    fetcher,
  );

  return { data, isLoading, isError: !!error };
}
