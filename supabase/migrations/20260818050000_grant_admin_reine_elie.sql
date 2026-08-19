-- Accorde le rôle admin au compte reine.elie@gmail.com, pour qu'il accède
-- directement au back office (/admin/products) après connexion via /auth.
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'
FROM auth.users
WHERE email = 'reine.elie@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;
