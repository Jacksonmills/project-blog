import { getBlogPostList } from "@/helpers/file-helpers";
import rss from 'rss';

import { BLOG_TITLE } from '@/constants';

export async function GET() {
  const allPosts = await getBlogPostList();

  const feed = new rss({
    title: BLOG_TITLE,
    managingEditor: 'JEM',
    webMaster: 'JEM',
    language: 'en',
    pubDate: new Date().toUTCString(),
    ttl: 60,
  });

  allPosts.forEach((post) => {
    feed.item({
      title: post.title,
      date: post.publishedOn,
      description: post.abstract,
    });
  });

  const xml = feed.xml({ indent: true });

  return new Response(xml, {
    status: 200,
    headers: {
      'content-type': 'application/xml',
    },
  });
};