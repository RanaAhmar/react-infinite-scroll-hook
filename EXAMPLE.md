# Practical Examples

Here are a few real-world scenarios to help you implement `react-infinite-scroll-hook` in your projects quickly. 

## 1. Standard Feed (List of Articles/Posts)
This is the most common use case: fetching a list of items as the user scrolls down the page. In this example, we attach the `lastElementRef` directly to the final item in the array.

```jsx
import React, { useState } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';

export const StandardFeed = () => {
  const [posts, setPosts] = useState(Array.from({ length: 15 }, (_, i) => `Post ${i + 1}`));
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = () => {
    if (loading || !hasMore) return;
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setPosts((prev) => {
        const nextPosts = Array.from({ length: 10 }, (_, i) => `Post ${prev.length + i + 1}`);
        // Stop loading after 45 posts for this example
        if (prev.length + nextPosts.length >= 45) setHasMore(false);
        return [...prev, ...nextPosts];
      });
      setLoading(false);
    }, 800);
  };

  const [lastElementRef] = useInfiniteScroll(loadMore, {
    rootMargin: '100px', // Start loading slightly before reaching the exact bottom
  });

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1>Latest Posts</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {posts.map((post, index) => {
          const isLastElement = posts.length === index + 1;
          
          return (
            <li 
              key={index} 
              ref={isLastElement ? lastElementRef : null} 
              style={{ padding: '20px', borderBottom: '1px solid #ccc' }}
            >
              {post}
            </li>
          );
        })}
      </ul>
      
      {loading && <p style={{ textAlign: 'center' }}>Loading more posts...</p>}
      {!hasMore && <p style={{ textAlign: 'center', color: '#888' }}>No more posts to load.</p>}
    </div>
  );
};
```

## 2. Image Grid / Masonry Layout
Infinite scrolling is highly popular for image galleries. Instead of attaching the ref to a specific grid item (which can be tricky with different screen sizes), it is often cleaner to place a "sentry" element at the very bottom of the grid container.

```jsx
import React, { useState } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';

export const ImageGrid = () => {
  const [images, setImages] = useState(Array.from({ length: 12 }, (_, i) => i));
  const [loading, setLoading] = useState(false);

  const loadMoreImages = () => {
    if (loading) return;
    setLoading(true);
    
    setTimeout(() => {
      setImages((prev) => [...prev, ...Array.from({ length: 12 }, (_, i) => prev.length + i)]);
      setLoading(false);
    }, 1000);
  };

  const [bottomBoundaryRef] = useInfiniteScroll(loadMoreImages, {
    rootMargin: '200px', // Larger margin so images load well before the user sees empty space
  });

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
        {images.map((id) => (
          <img 
            key={id} 
            src={`https://picsum.photos/seed/${id}/200/200`} 
            alt={`Random ${id}`} 
            style={{ width: '100%', borderRadius: '8px', display: 'block' }} 
          />
        ))}
      </div>
      
      {/* Sentry Element acting as the boundary */}
      <div ref={bottomBoundaryRef} style={{ padding: '20px', textAlign: 'center' }}>
        {loading && <span>Loading more images...</span>}
      </div>
    </div>
  );
};
```

## 3. Chat Application (Reverse Infinite Scroll)
In a chat app, you usually start at the bottom and scroll *up* to load older messages. You can achieve this smoothly using CSS Flexbox (`flex-direction: column-reverse`) and attaching the observer ref to the "top" element.

```jsx
import React, { useState } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';

export const ChatHistory = () => {
  const [messages, setMessages] = useState(Array.from({ length: 15 }, (_, i) => `Recent Message ${i + 1}`));
  const [loading, setLoading] = useState(false);
  const [hasOlderMessages, setHasOlderMessages] = useState(true);

  const loadOlderMessages = () => {
    if (loading || !hasOlderMessages) return;
    setLoading(true);
    
    setTimeout(() => {
      const olderMessages = Array.from({ length: 10 }, (_, i) => `Older Message ${messages.length + i + 1}`);
      setMessages((prev) => [...prev, ...olderMessages]);
      if (messages.length > 50) setHasOlderMessages(false);
      setLoading(false);
    }, 800);
  };

  // We are observing the "top" of the chat, which is technically the end of our column-reverse container
  const [topBoundaryRef] = useInfiniteScroll(loadOlderMessages, {
    rootMargin: '50px',
  });

  return (
    <div 
      style={{ 
        height: '400px', 
        overflowY: 'auto', 
        display: 'flex', 
        flexDirection: 'column-reverse', // Visually flips the container
        border: '1px solid #ddd',
        padding: '10px'
      }}
    >
      {/* Messages map from newest (bottom) to oldest (top) */}
      {messages.map((msg, index) => {
        const isOldestMessage = messages.length === index + 1;
        
        return (
          <div 
            key={index} 
            ref={isOldestMessage ? topBoundaryRef : null}
            style={{ padding: '10px', margin: '5px 0', background: '#f1f1f1', borderRadius: '5px' }}
          >
            {msg}
          </div>
        );
      })}

      {loading && <div style={{ textAlign: 'center', padding: '10px', color: '#888' }}>Loading history...</div>}
    </div>
  );
};
```