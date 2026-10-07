import React from 'react';
import Image from 'next/image';
import { FaArrowRight, FaInstagram } from 'react-icons/fa';
import { INSTAGRAM_HANDLE, INSTAGRAM_POSTS, INSTAGRAM_URL } from '@/lib/instagram';

const POSTS_SHOWN = 5;

// The follow tile fills out the last row of the grid (2 columns on phones,
// 3 from md up), so the grid never ends on a gap. Indexed by post count.
const PHONE_SPAN = ['col-span-2', 'col-span-1'];
const DESKTOP_SPAN = ['md:col-span-3', 'md:col-span-2', 'md:col-span-1'];

const FOCUS_RING = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet';

// Recent Instagram posts as plain links rather than Instagram's embed script,
// which would add a heavy third-party bundle and tracking to the page.
const InstagramRecaps = () => {
  const posts = INSTAGRAM_POSTS.slice(0, POSTS_SHOWN);

  return (
    <section aria-labelledby="recaps-heading" className="mt-16">
      <h2 id="recaps-heading" className="mt-0! mb-2! text-2xl text-balance">See what we&apos;ve been up to</h2>
      <p className="mb-6 text-ink/70">Photos and recaps from our meetings, straight from our Instagram.</p>

      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {posts.map((post) => (
          <li key={post.image}>
            <a
              href={post.href ?? INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex h-full flex-col overflow-hidden rounded-xl border border-lavender bg-white shadow-[0_8px_24px_-12px_rgba(37,25,122,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:border-violet/50 ${FOCUS_RING}`}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-lavender/40">
                <Image
                  src={post.image}
                  alt={post.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 330px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex items-center justify-between gap-2 px-3 py-2.5">
                <span className="text-sm font-medium leading-snug text-ink">{post.title}</span>
                <FaInstagram className="shrink-0 text-violet" aria-hidden />
              </div>
            </a>
          </li>
        ))}

        <li className={`${PHONE_SPAN[posts.length % 2]} ${DESKTOP_SPAN[posts.length % 3]}`}>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex h-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-violet/40 bg-white/70 p-6 text-center transition-colors hover:bg-white ${FOCUS_RING}`}
          >
            <FaInstagram className="text-3xl text-violet" aria-hidden />
            <span className="font-heading text-lg font-bold text-ink">More on Instagram</span>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-violet">
              @{INSTAGRAM_HANDLE}
              <FaArrowRight className="text-xs" aria-hidden />
            </span>
          </a>
        </li>
      </ul>
    </section>
  );
};

export default InstagramRecaps;
