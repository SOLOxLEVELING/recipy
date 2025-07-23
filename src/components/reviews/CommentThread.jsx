import React, { useState } from "react";

const CommentThread = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment("");
    }
  };

  return (
    <div className="mt-10">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        Feedback & Comments
      </h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-4 rounded-lg">
        <label
          htmlFor="comment"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Leave a comment
        </label>
        <textarea
          id="comment"
          rows="3"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
          placeholder="Tried this recipe? Share your thoughts!"
        ></textarea>
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors"
        >
          Post Comment
        </button>
      </form>

      {/* Comment List */}
      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0 h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center font-bold text-gray-600">
                {comment.user.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="bg-white p-3 rounded-lg border">
                  <p className="font-semibold text-gray-900">{comment.user}</p>
                  <p className="text-gray-700">{comment.text}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(comment.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No comments yet. Be the first to share your feedback!
          </p>
        )}
      </div>
    </div>
  );
};

export default CommentThread;
