# React Infinite Scroll Hook 🚀

> A lightweight, highly optimized `IntersectionObserver` hook for flawlessly handling infinite scrolling in React applications.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![SEO](https://img.shields.io/badge/SEO-Optimized-success)](#)

## Features
- **Zero Dependencies**: Uses native robust browser APIs (`IntersectionObserver`).
- **Highly Performant**: No scroll event listeners! Completely eliminates scroll-jank.
- **Easy to Use**: Simply attach a `ref` to your last element, and provide a callback.
- **SSR Safe**: Perfectly safe for Next.js, Remix, and standard React SSR environments.

## Installation
Just drop `index.js` into your hooks directly or `npm install react-infinite-scroll-hook` (if published).

## Usage

```jsx
import React, { useState } from 'react';
import useInfiniteScroll from './useInfiniteScroll';

function ItemList() {
  const [items, setItems] = useState([1, 2, 3, 4, 5]);
  const [loading, setLoading] = useState(false);

  const loadMore = () => {
    if (loading) return;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setItems((prev) => [...prev, prev.length + 1, prev.length + 2, prev.length + 3]);
      setLoading(false);
    }, 1000);
  };

  const [lastElementRef] = useInfiniteScroll(loadMore, {
    rootMargin: '100px', // start loading before the user reaches the exact bottom
  });

  return (
    <div>
      {items.map((item, index) => {
        // Attach ref to the final item in the loop
        if (items.length === index + 1) {
          return <div ref={lastElementRef} key={index}>Item {item}</div>;
        }
        return <div key={index}>Item {item}</div>;
      })}
      {loading && <p>Loading more items...</p>}
    </div>
  );
}
```

## Why This Matters for SEO
Infinite scrolling, when poorly implemented, can destroy performance scores (Core Web Vitals) due to heavy DOM operations bound to traditional scroll events. By utilizing the Hardware-Accelerated `IntersectionObserver` API, we guarantee buttery smooth 60fps scrolling, ensuring Google rewards your site with top tier algorithmic ranks.





---

## 🚀 Discover More from Stackaura

If you found this tool useful, check out our other high-performance web utilities and follow **Ahmar Hussain** for more open-source excellence.

### 🌟 Featured Projects
- **[Free LLM APIs](https://github.com/RanaAhmar/free-llm-apis)** - A curated list of zero-cost AI endpoints.
- **[Awesome MCP Servers](https://github.com/RanaAhmar/awesome-mcp-servers)** - The ultimate collection of Model Context Protocol implementations.
- **[System Design Cheatsheet](https://github.com/RanaAhmar/system-design-cheatsheet)** - Master complex architectures in minutes.
- **[Next.js SaaS Starter](https://github.com/RanaAhmar/nextjs-saas-starter)** - The fastest way to launch your next product.

### 🔗 Stay Connected
- **Website:** [stackaura.com](https://www.stackaura.com/)
- **Author:** [Ahmar Hussain](https://github.com/RanaAhmar)

---




