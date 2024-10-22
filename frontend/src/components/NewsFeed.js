import React, { useEffect, useState } from 'react';
import axios from 'axios';

function NewsFeed() {
    const [newsArticles, setNewsArticles] = useState([]);

    useEffect(() => {
        async function fetchNewsData() {
            try {
                const response = await axios.get('/api/trip', {
                    params: { arrival: 'Los Angeles' },
                });
                setNewsArticles(response.data.news);
            } catch (error) {
                console.error('Error fetching news data:', error);
            }
        }
        fetchNewsData();
    }, []);

    if (newsArticles.length === 0) return <p>Loading news...</p>;

    return (
        <div className="news-feed">
            <h2>Local News</h2>
            <ul>
                {newsArticles.map((article, index) => (
                    <li key={index}>
                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                            {article.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NewsFeed;
