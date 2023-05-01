import { useApiSportsFootball } from '@/lib/ApiSportsFootball'

export const useFootballFixtures = (date: string) => {
  const { data, isLoading, isError } = useApiSportsFootball(date, 'fixtures')

  return {
    fixtures: data?.response,
    isLoading,
    isError,
  }
}
