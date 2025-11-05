import React, {useState} from "react";
import {UserCircle2} from "lucide-react"; // A better default icon

const CommentThread = ({comments, onAddComment}) => {
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
            <h3 className="text-3xl font-bold text-neutral-800 mb-8">
                Feedback & Comments
            </h3>

            {/* --- Comment Form --- */}
            <form onSubmit={handleSubmit} className="mb-10">
                <label
                    htmlFor="comment"
                    className="block text-sm font-semibold text-neutral-700 mb-2"
                >
                    Leave a comment
                </label>
                <textarea
                    id="comment"
                    rows="4"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full p-3 border border-neutral-300 rounded-lg shadow-sm
                     focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                     transition-shadow"
                    placeholder="Tried this recipe? Share your thoughts!"
                ></textarea>
                <div className="text-right">
                    <button
                        type="submit"
                        className="mt-3 px-6 py-2 bg-primary-600 text-white font-semibold rounded-full
                       hover:bg-primary-700 transition-colors
                       disabled:bg-neutral-300"
                        disabled={!newComment.trim()}
                    >
                        Post Comment
                    </button>
                </div>
            </form>

            {/* --- Comment List --- */}
            <div className="space-y-8">
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <div key={index} className="flex items-start space-x-4">
                            {/* Avatar */}
                            <div
                                className="flex-shrink-0 h-11 w-11 bg-neutral-100 rounded-full flex items-center justify-center">
                                <UserCircle2 size={24} className="text-neutral-400"/>
                            </div>

                            {/* Comment Content */}
                            <div className="flex-1">
                                <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                                    <p className="font-semibold text-neutral-900">
                                        {comment.user}
                                    </p>
                                    <p className="text-neutral-700 mt-1">{comment.text}</p>
                                </div>
                                <p className="text-xs text-neutral-500 mt-2">
                                    {new Date(comment.date).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-neutral-500 text-center py-4">
                        No comments yet. Be the first to share your feedback!
                    </p>
                )}
            </div>
        </div>
    );
};

export default CommentThread;