import { useState, useEffect, useRef, useCallback } from "react";

interface UseInfiniteScrollOptions<T> {
  data: T[];
  pageSize?: number;
  loadDelay?: number;
}

interface UseInfiniteScrollReturn<T> {
  items: T[];
  hasMore: boolean;
  isLoading: boolean;
  observerRef: React.RefObject<HTMLDivElement>;
  loadMore: () => void;
  reset: () => void;
}

export function useInfiniteScroll<T>({
  data,
  pageSize = 10,
  loadDelay = 500,
}: UseInfiniteScrollOptions<T>): UseInfiniteScrollReturn<T> {
  const [items, setItems] = useState<T[]>(data.slice(0, pageSize));
  const [hasMore, setHasMore] = useState(data.length > pageSize);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    setTimeout(() => {
      const currentLength = items.length;
      const nextItems = data.slice(currentLength, currentLength + pageSize);

      if (nextItems.length === 0) {
        setHasMore(false);
      } else {
        setItems((prev) => [...prev, ...nextItems]);
        if (currentLength + nextItems.length >= data.length) {
          setHasMore(false);
        }
      }

      setIsLoading(false);
    }, loadDelay);
  }, [data, items.length, pageSize, loadDelay, isLoading, hasMore]);

  const reset = useCallback(() => {
    setItems(data.slice(0, pageSize));
    setHasMore(data.length > pageSize);
    setIsLoading(false);
  }, [data, pageSize]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [hasMore, isLoading, loadMore]);

  // Reset when data changes
  useEffect(() => {
    reset();
  }, [data]);

  return {
    items,
    hasMore,
    isLoading,
    observerRef,
    loadMore,
    reset,
  };
}
