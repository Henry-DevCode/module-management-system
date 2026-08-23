-- Create Allowed Students Table
CREATE TABLE allowed_students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    section TEXT NOT NULL
);

-- Insert initial allowed students
INSERT INTO allowed_students (full_name, section) VALUES 
('Juan Dela Cruz', 'BSIT 3E'),
('Maria Santos', 'BSIT 3F'),
('Henry Dela Cruz', 'BSIT 3E');

-- Create Instructors Table
CREATE TABLE instructors (
    id TEXT PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    full_name TEXT NOT NULL,
    sections TEXT[] NOT NULL
);

-- Insert initial instructors
INSERT INTO instructors (id, username, password, full_name, sections) VALUES 
('INS-1', 'henry.delacruz', 'Fedorax@122401', 'Henry', ARRAY['BSIT 3E', 'BSIT 3F']),
('INS-2', 'yman.mangaring', 'Fedorax@122401', 'Yman', ARRAY['BSIT 3D']);

-- Create Registered Students Table
CREATE TABLE students (
    id TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    section TEXT NOT NULL,
    course TEXT NOT NULL,
    registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Modules Table
CREATE TABLE modules (
    id TEXT PRIMARY KEY,
    course TEXT NOT NULL,
    semester TEXT NOT NULL,
    week INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    pdf TEXT NOT NULL
);

-- Insert initial modules
INSERT INTO modules (id, course, semester, week, title, description, pdf) VALUES 
('MOD-MD-2', 'Open Source Programming', 'midterm', 2, 'Midterm Week 2', 'Midterm Week 2 Module', '/modules/midterm/[MD] - WEEK 2 - OPS.pdf'),
('MOD-MD-3', 'Open Source Programming', 'midterm', 3, 'Midterm Week 3', 'Midterm Week 3 Module', '/modules/midterm/[MD] - WEEK 3 - OPS.pdf'),
('MOD-MD-4', 'Open Source Programming', 'midterm', 4, 'Midterm Week 4', 'Midterm Week 4 Module', '/modules/midterm/[MD] - WEEK 4 - OPS.pdf'),
('MOD-MD-5', 'Open Source Programming', 'midterm', 5, 'Midterm Week 5', 'Midterm Week 5 Module', '/modules/midterm/[MD] - WEEK 5 - OPS.pdf'),
('MOD-MD-6', 'Open Source Programming', 'midterm', 6, 'Midterm Week 6', 'Midterm Week 6 Module', '/modules/midterm/[MD] - WEEK 6 - OPS.pdf'),
('MOD-MD-7', 'Open Source Programming', 'midterm', 7, 'Midterm Week 7', 'Midterm Week 7 Module', '/modules/midterm/[MD] - WEEK 7 - OPS.pdf'),
('MOD-MD-8', 'Open Source Programming', 'midterm', 8, 'Midterm Week 8', 'Midterm Week 8 Module', '/modules/midterm/[MD] - WEEK 8 - OPS .pdf'),
('MOD-FN-1', 'Open Source Programming', 'finals', 1, 'Finals Week 1', 'Finals Week 1 Module', '/modules/finals/[FN] - WEEK 1 - OPS.pdf'),
('MOD-FN-2', 'Open Source Programming', 'finals', 2, 'Finals Week 2', 'Finals Week 2 Module', '/modules/finals/[FN] - WEEK 2 - OPS.pdf'),
('MOD-FN-3', 'Open Source Programming', 'finals', 3, 'Finals Week 3', 'Finals Week 3 Module', '/modules/finals/[FN] - WEEK 3 - OPS.pdf'),
('MOD-FN-4', 'Open Source Programming', 'finals', 4, 'Finals Week 4', 'Finals Week 4 Module', '/modules/finals/[FN] - WEEK 4 - OPS.pdf'),
('MOD-FN-5', 'Open Source Programming', 'finals', 5, 'Finals Week 5', 'Finals Week 5 Module', '/modules/finals/[FN] - WEEK 5 - OPS.pdf'),
('MOD-FN-6', 'Open Source Programming', 'finals', 6, 'Finals Week 6', 'Finals Week 6 Module', '/modules/finals/[FN] - WEEK 6 - OPS.pdf'),
('MOD-FN-7', 'Open Source Programming', 'finals', 7, 'Finals Week 7', 'Finals Week 7 Module', '/modules/finals/[FN] - WEEK 7 - OPS.pdf');

-- Create Activity Table (Tracking module views)
CREATE TABLE activity (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id TEXT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    module_id TEXT NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
    viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (optional, for safety)
-- ALTER TABLE students ENABLE ROW LEVEL SECURITY;
-- (Keeping policies open for simple API access via server since all logic handles auth on Next.js server actions)
