-- ====================================================================
-- SUPABASE POSTGRESQL SCHEMA FOR SRE PENS V2 BACKEND
-- Entities: Academics, Activities (Events), Articles, Merchandise, Staff
-- ====================================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================================
-- 1. ACADEMICS TABLE
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.academics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    image TEXT NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL DEFAULT 'Renewable Energy',
    pdf_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS and create policy for public read access
ALTER TABLE public.academics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on academics" 
    ON public.academics FOR SELECT USING (true);


-- ==========================================================
-- 2. ACTIVITIES / EVENTS TABLE
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    time VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    content TEXT NOT NULL,
    image TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS and create policy for public read access
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on activities" 
    ON public.activities FOR SELECT USING (true);


-- ==========================================================
-- 3. ARTICLES TABLE
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    author VARCHAR(100) NOT NULL DEFAULT 'SRE PENS',
    created_by VARCHAR(150) NOT NULL,
    image TEXT NOT NULL,
    description TEXT NOT NULL,
    content TEXT NOT NULL,
    published_date VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS and create policy for public read access
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on articles" 
    ON public.articles FOR SELECT USING (true);


-- ==========================================================
-- 4. MERCHANDISE TABLE
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.merchandise (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price VARCHAR(100) NOT NULL,
    image TEXT NOT NULL,
    tag VARCHAR(100),
    order_link TEXT NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS and create policy for public read access
ALTER TABLE public.merchandise ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on merchandise" 
    ON public.merchandise FOR SELECT USING (true);


-- ==========================================================
-- 5. STAFF & DIVISIONS (ABOUT MEMBER SECTION)
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.divisions (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    order_index INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.divisions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on divisions" 
    ON public.divisions FOR SELECT USING (true);

CREATE TABLE IF NOT EXISTS public.members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    division_id VARCHAR(50) REFERENCES public.divisions(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    role VARCHAR(150) NOT NULL,
    major VARCHAR(150) NOT NULL,
    img_url TEXT,
    linkedin_url TEXT,
    instagram_handle VARCHAR(100),
    order_index INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on members" 
    ON public.members FOR SELECT USING (true);


-- ==========================================================
-- FUNCTION FOR AUTOMATIC TIMESTAMPS
-- ==========================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for all tables
CREATE TRIGGER update_academics_modtime BEFORE UPDATE ON public.academics FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_activities_modtime BEFORE UPDATE ON public.activities FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_articles_modtime BEFORE UPDATE ON public.articles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_merchandise_modtime BEFORE UPDATE ON public.merchandise FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_members_modtime BEFORE UPDATE ON public.members FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
