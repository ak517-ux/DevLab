import fs from "fs";
import path from "path";
import { CourseCard } from "@/components/courses/CourseCard";
import { GridBackground } from "@/components/ui/GridBackground";

export default function CoursesPage() {
  const coursesDir = path.join(process.cwd(), "courses");
  const courseFolders = fs.readdirSync(coursesDir);

  const courses = courseFolders.map((folder) => {
    const jsonPath = path.join(coursesDir, folder, "course.json");
    const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
    return { ...data, slug: folder };
  });

  return (
    <main className="relative min-h-screen py-24 px-6">
      <GridBackground />

      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-semibold mb-12 tracking-tight text-white">
          Курсы DevLab
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </div>
    </main>
  );
}
