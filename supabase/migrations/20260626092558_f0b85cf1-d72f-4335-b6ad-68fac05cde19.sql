
-- ROLES
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- PRODUCTS
CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  description text,
  meta_description text,
  price text NOT NULL,
  rating numeric(2,1) NOT NULL DEFAULT 4.5,
  category text NOT NULL,
  image_emoji text,
  image_url text,
  affiliate_url text NOT NULL,
  badge text,
  position int NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  clicks int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.products TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone reads active products" ON public.products
  FOR SELECT TO anon, authenticated USING (active = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins insert products" ON public.products
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update products" ON public.products
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete products" ON public.products
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

CREATE TRIGGER products_set_updated_at BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Click increment (safe, public)
CREATE OR REPLACE FUNCTION public.increment_product_clicks(_id uuid)
RETURNS void LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  UPDATE public.products SET clicks = clicks + 1 WHERE id = _id AND active = true;
$$;

GRANT EXECUTE ON FUNCTION public.increment_product_clicks(uuid) TO anon, authenticated;

-- Seed initial products from static catalog
INSERT INTO public.products (slug, title, price, rating, category, image_emoji, affiliate_url, badge, position) VALUES
  ('jumelles-astro', 'Jumelles astronomiques 10x50', '89,90 €', 4.5, 'Observation', '🔭', 'https://www.amazon.fr/', 'Best-seller', 1),
  ('telescope-debutant', 'Télescope débutant 70/700', '129,00 €', 4.3, 'Observation', '🪐', 'https://www.amazon.fr/', NULL, 2),
  ('maquette-iss', 'Maquette officielle ISS', '49,90 €', 4.7, 'Maquettes', '🛰️', 'https://www.amazon.fr/', NULL, 3),
  ('livre-enfant-espace', 'Mon grand livre de l''espace', '14,90 €', 4.8, 'Enfants', '📚', 'https://www.amazon.fr/', 'Coup de cœur', 4),
  ('poster-systeme-solaire', 'Poster système solaire XXL', '19,90 €', 4.6, 'Déco', '🌌', 'https://www.amazon.fr/', NULL, 5),
  ('globe-lumineux', 'Globe terrestre lumineux', '59,00 €', 4.4, 'Déco', '🌍', 'https://www.amazon.fr/', NULL, 6);
