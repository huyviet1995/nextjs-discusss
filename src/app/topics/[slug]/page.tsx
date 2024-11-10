'use client';
import { useParams } from 'next/navigation';
const TopicPage = () => {
    const { slug } = useParams();
    return (
        <div>
            <h1>Topic: {slug}</h1>
        </div>
    );
};

export default TopicPage;
