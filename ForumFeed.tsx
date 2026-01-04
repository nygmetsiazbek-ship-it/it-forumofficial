import { MessageCircle, ThumbsUp, Clock } from 'lucide-react';
import { Post } from '../App';

interface ForumFeedProps {
  posts: Post[];
  onSelectPost: (post: Post) => void;
}

export function ForumFeed({ posts, onSelectPost }: ForumFeedProps) {
  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMins = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMs / 3600000);
    const diffInDays = Math.floor(diffInMs / 86400000);

    if (diffInMins < 60) return `${diffInMins}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${diffInDays}d ago`;
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg p-4">
        <h2>Recent Discussions</h2>
        <p className="text-gray-600">Join the conversation with your classmates</p>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white rounded-lg p-12 text-center">
          <MessageCircle className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-gray-600 mb-2">No posts yet</h3>
          <p className="text-gray-500">Be the first to start a discussion!</p>
        </div>
      ) : (
        posts.map(post => (
          <div
            key={post.id}
            onClick={() => onSelectPost(post)}
            className="bg-white rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="mb-2">{post.title}</h3>
                <p className="text-gray-600 line-clamp-2">{post.content}</p>
              </div>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm ml-4 whitespace-nowrap">
                {post.category}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-4">
                <span>{post.author}</span>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{formatTimeAgo(post.timestamp)}</span>
                </div>
              </div> 

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <ThumbsUp size={16} />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle size={16} />
                  <span>{post.replies.length}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
