import React from 'react';
import Image from 'next/image';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';

const posts = [
  {
    id: 1,
    username: "anime_fan99",
    content: "Naruto's journey from an outcast to the Hokage is one of the most inspiring stories in anime! 🍥🔥 #Naruto #Hokage",
    image: "/images/hokage-naruto.png.gif",
    likes: 1200,
    comments: 340,
    shares: 150,
    timestamp: "2025-02-17T12:30:00Z",
  },
  {
    id: 2,
    username: "got_fanatic",
    content: "Still can't get over the Red Wedding... 😭💔 #GameOfThrones #RedWedding",
    image: "/images/red-wedding.jpg",
    likes: 2500,
    comments: 560,
    shares: 310,
    timestamp: "2025-02-17T13:00:00Z",
  },
  {
    id: 3,
    username: "jjk_sorcerer",
    content: "Gojo Satoru is the strongest sorcerer, no debate! 🥶💙 #JujutsuKaisen #GojoSatoru",
    image: "/images/gojo.webp",
    likes: 3100,
    comments: 670,
    shares: 420,
    timestamp: "2025-02-17T14:00:00Z",
  },
  {
    id: 4,
    username: "otaku_world",
    content: "Madara Uchiha's entrance in the war was pure domination. Who could stop him?! 💀🔥 #Madara #NarutoShippuden",
    image: "/images/Madara-Uchiha.avif",
    likes: 2800,
    comments: 590,
    shares: 390,
    timestamp: "2025-02-17T15:00:00Z",
  },
  {
    id: 5,
    username: "westeros_king",
    content: "Jon Snow was truly the rightful king of Westeros! 👑❄️ #GameOfThrones #JonSnow",
    image: "/images/white-wolf.jpeg",
    likes: 2000,
    comments: 480,
    shares: 310,
    timestamp: "2025-02-17T16:00:00Z",
  }
];

const Page = () => {
  return (
    <div className="bg-black min-h-screen flex flex-col items-center py-0 px-0 sm:py-6 sm:px-4 lg:px-8">
  <div className="w-full max-w-xl flex flex-col gap-6"> {/* Spacing between posts */}
    {posts.map((post) => (
      <div key={post.id} className="shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4"> {/* Add inner padding */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
              <span className="text-white text-sm font-semibold">{post.username.charAt(0).toUpperCase()}</span>
            </div>
            <span className="text-white font-semibold text-sm">{post.username}</span>
          </div>
          <MoreHorizontal className="w-5 h-5 text-gray-400 cursor-pointer" />
        </div>

        {/* Image */}
        <div className="relative mt-4 aspect-square">
          <Image
            src={post.image}
            alt="Post content"
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-6 text-gray-400 px-4 py-3">
          <Heart className="w-6 h-6 hover:text-red-500 cursor-pointer transition-colors" />
          <MessageCircle className="w-6 h-6 hover:text-blue-500 cursor-pointer transition-colors" />
          <Share2 className="w-6 h-6 hover:text-green-500 cursor-pointer transition-colors" />
        </div>

        {/* Likes */}
        <p className="text-white font-semibold text-sm px-4">{post.likes.toLocaleString()} likes</p>

        {/* Caption */}
        <p className="text-gray-300 text-sm mt-1 px-4">
          <span className="font-semibold mr-2">{post.username}</span>
          {post.content}
        </p>

        {/* Comments & Timestamp */}
        <p className="text-gray-500 text-xs mt-2 px-4">
          View all {post.comments} comments
        </p>
        <p className="text-gray-400 text-xs uppercase mt-1 px-4 pb-4">
          {new Date(post.timestamp).toLocaleDateString()}
        </p>
      </div>
    ))}
  </div>
</div>

  );
};

export default Page;
