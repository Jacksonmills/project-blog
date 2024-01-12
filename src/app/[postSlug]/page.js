import React from 'react';

import BlogHero from '@/components/BlogHero';

import styles from './postSlug.module.css';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { loadBlogPost } from '@/helpers/file-helpers';

const loadCachedBlogPost = React.cache((postSlug) =>
  loadBlogPost(postSlug)
);

export async function generateMetadata({ params }) {
  const { frontmatter } = await loadCachedBlogPost(params.postSlug);

  return {
    title: `${frontmatter.title}`,
    description: `${frontmatter.abstract.slice(0, 48)}...}`
  };
}

async function BlogPost({ params }) {
  const { content, frontmatter } = await loadCachedBlogPost(params.postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote source={content} />
      </div>
    </article>
  );
}

export default BlogPost;
