-- CONTENT TOPICS (article production pipeline)
CREATE TABLE public.content_topics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  keyword text NOT NULL,
  intent text,
  format text,
  priority text NOT NULL DEFAULT 'P3' CHECK (priority IN ('P1', 'P2', 'P3')),
  monetization_lever text,
  target_length int NOT NULL DEFAULT 700,
  internal_links text[] NOT NULL DEFAULT '{}',
  status text NOT NULL DEFAULT 'a_produire'
    CHECK (status IN ('a_produire', 'draft_genere', 'en_revision', 'publie')),
  blog_post_id uuid REFERENCES public.blog_posts(id) ON DELETE SET NULL,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.content_topics TO authenticated;
GRANT ALL ON public.content_topics TO service_role;

ALTER TABLE public.content_topics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins read topics" ON public.content_topics
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins insert topics" ON public.content_topics
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update topics" ON public.content_topics
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete topics" ON public.content_topics
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER content_topics_set_updated_at BEFORE UPDATE ON public.content_topics
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
