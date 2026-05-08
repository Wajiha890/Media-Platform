import { useState, useEffect, useCallback, useRef } from 'react';
import { apiClient } from '../api/client';

export const useInfiniteScroll = (endpoint, limit = 10) => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef();

  const lastItemRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observerRef.current) observerRef.current.disconnect();
      
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });
      
      if (node) observerRef.current.observe(node);
    },
    [isLoading, hasMore]
  );

  const loadMore = async () => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    try {
      const response = await apiClient.get(`${endpoint}?page=${page}&limit=${limit}`);
      const newItems = response.data.items;
      
      if (newItems.length < limit) {
        setHasMore(false);
      }
      
      setItems(prev => [...prev, ...newItems]);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Failed to load more items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { items, isLoading, hasMore, lastItemRef, loadMore };
};