
-- Create properties table first
CREATE TABLE public.properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL,
    location TEXT NOT NULL,
    bedrooms INTEGER NOT NULL,
    bathrooms NUMERIC NOT NULL,
    area NUMERIC NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('sale', 'rent')),
    images TEXT[],
    features TEXT[],
    coordinates JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on properties
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies for properties
CREATE POLICY "Users can view all published properties"
ON public.properties
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can insert their own properties"
ON public.properties
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own properties"
ON public.properties
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own properties"
ON public.properties
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Now create the admin role system
CREATE TYPE public.app_role AS ENUM ('super_admin', 'admin', 'moderator', 'property_manager', 'support_staff', 'user');

CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    assigned_by UUID REFERENCES auth.users(id),
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer functions
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.get_user_role(_user_id UUID)
RETURNS app_role
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT COALESCE(
    (SELECT role 
     FROM public.user_roles 
     WHERE user_id = _user_id 
     ORDER BY 
       CASE role
         WHEN 'super_admin' THEN 1
         WHEN 'admin' THEN 2
         WHEN 'moderator' THEN 3
         WHEN 'property_manager' THEN 4
         WHEN 'support_staff' THEN 5
         ELSE 6
       END
     LIMIT 1),
    'user'::app_role
  )
$$;

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Super admins can manage all roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Admins can assign non-admin roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (
  public.has_role(auth.uid(), 'admin') AND 
  role NOT IN ('super_admin', 'admin')
);

-- Add admin columns to properties table
ALTER TABLE public.properties ADD COLUMN status TEXT DEFAULT 'pending';
ALTER TABLE public.properties ADD COLUMN featured BOOLEAN DEFAULT false;
ALTER TABLE public.properties ADD COLUMN admin_notes TEXT;
ALTER TABLE public.properties ADD COLUMN reviewed_by UUID REFERENCES auth.users(id);
ALTER TABLE public.properties ADD COLUMN reviewed_at TIMESTAMP WITH TIME ZONE;

-- Additional admin policies for properties
CREATE POLICY "Admins can view all properties"
ON public.properties
FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'admin') OR 
  public.has_role(auth.uid(), 'super_admin') OR
  public.has_role(auth.uid(), 'property_manager')
);

CREATE POLICY "Admins can update property status"
ON public.properties
FOR UPDATE
TO authenticated
USING (
  public.has_role(auth.uid(), 'admin') OR 
  public.has_role(auth.uid(), 'super_admin') OR
  public.has_role(auth.uid(), 'property_manager')
);

-- Create admin activity log table
CREATE TABLE public.admin_activity_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID REFERENCES auth.users(id) NOT NULL,
    action TEXT NOT NULL,
    target_type TEXT NOT NULL,
    target_id UUID,
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.admin_activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view activity logs"
ON public.admin_activity_log
FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'admin') OR 
  public.has_role(auth.uid(), 'super_admin')
);
