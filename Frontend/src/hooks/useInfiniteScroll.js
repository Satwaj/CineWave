import { useEffect, useCallback } from 'react';

const useInfiniteScroll = (callback, hasMore, loading) => {
  const handleScroll = useCallback(() => {
    if (loading || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 300) {
      callback();
    }
  }, [callback, hasMore, loading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
};

export default useInfiniteScroll;
