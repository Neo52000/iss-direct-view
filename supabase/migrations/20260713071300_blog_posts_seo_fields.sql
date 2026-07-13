ALTER TABLE public.blog_posts
  ADD COLUMN faq jsonb NOT NULL DEFAULT '[]',
  ADD COLUMN cover_image_alt text,
  ADD COLUMN social_suggestions jsonb NOT NULL DEFAULT '[]',
  ADD COLUMN to_verify text;
