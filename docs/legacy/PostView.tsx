import { useState } from 'react';
import { ArrowLeft, ThumbsUp, MessageCircle, Clock, Send } from 'lucide-react';
import { Post } from '../App';

interface PostViewProps {
  post: Post;
  onBack: () => void;
  onAddReply: (postId: string, content: string) => void;
  onLike: (postId: string) => void;
}

export function PostView({ post, onBack, onAddReply, onLike }: PostViewProps) {
  const [replyContent, setReplyContent] = useState('');

  const formatTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyContent.trim()) {
      onAddReply(post.id, replyContent);
      setReplyContent('');
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft size={20} />
        Back to discussions
      </button>

      {/* Post Content */}
      <div className="bg-white rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
            {post.category}
          </span>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Clock size={14} />
            <span>{formatTime(post.timestamp)}</span>
          </div>
        </div>

        <h1 className="mb-4">{post.title}</h1>
        
        <p className="text-gray-700 mb-6 whitespace-pre-wrap">{post.content}</p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <span className="text-gray-600">Posted by {post.author}</span>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => onLike(post.id)}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ThumbsUp size={18} />
              <span>{post.likes}</span>
            </button>
            <div className="flex items-center gap-2 text-gray-600">
              <MessageCircle size={18} />
              <span>{post.replies.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Replies */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="mb-6">Replies ({post.replies.length})</h2>

        <div className="space-y-4 mb-6">
          {post.replies.map(reply => (
            <div key={reply.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span>{reply.author}</span>
                <span className="text-sm text-gray-500">{formatTime(reply.timestamp)}</span>
              </div>
              <p className="text-gray-700">{reply.content}</p>
            </div>
          ))}
        </div>

        {/* Reply Form */}
        <form onSubmit={handleSubmitReply} className="border-t border-gray-200 pt-6">
          <h3 className="mb-3">Add a reply</h3>
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Share your thoughts..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
            rows={4}
          />
          <div className="flex justify-end mt-3">
            <button
              type="submit"
              disabled={!replyContent.trim()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
              Post Reply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
