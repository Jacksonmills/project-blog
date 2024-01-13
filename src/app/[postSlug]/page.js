import React from 'react';
import dynamic from 'next/dynamic';

import BlogHero from '@/components/BlogHero';

import styles from './postSlug.module.css';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { loadBlogPost } from '@/helpers/file-helpers';
import CodeSnippet from '@/components/CodeSnippet';
import { notFound } from 'next/navigation';

const loadCachedBlogPost = React.cache((postSlug) =>
  loadBlogPost(postSlug)
);

export async function generateMetadata({ params }) {
  const post = await loadCachedBlogPost(params.postSlug);

  if (!post) {
    return null
  }

  const { frontmatter } = post;

  return {
    title: `${frontmatter.title}`,
    description: `${frontmatter.abstract.slice(0, 48)}...}`
  };
}

async function BlogPost({ params }) {
  const post = await loadCachedBlogPost(params.postSlug);

  if (!post) {
    notFound()
  }

  const { frontmatter, content } = post;

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote
          source={content}
          components={{
            pre: CodeSnippet,
            DivisionGroupsDemo: dynamic(() => import('@/components/DivisionGroupsDemo')),
            CircularColorsDemo: dynamic(() => import('@/components/CircularColorsDemo')),
          }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
