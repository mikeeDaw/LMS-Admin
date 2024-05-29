import {
  CoursePill,
  EmptySection,
} from "@/app/_components/dashboard/courses/coursePill";
import CourseHeader from "@/app/_components/dashboard/courses/header";
import { AddCourse } from "@/app/_components/modals/courseModals";
import { getAllCourses } from "@/app/_models/courseModel";
import { connectToDb } from "@/app/lib/mongoose";
import { auth } from "@/auth";
import { Bebas_Neue, Poppins } from "next/font/google";
import { Toaster } from "sonner";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"] });
const popp = Poppins({ weight: "400", subsets: ["latin"] });

const CoursePage = async () => {
  const sesh = await auth();
  console.log(sesh);
  await connectToDb();
  const courses = await getAllCourses();
  let delay = 0;
  return (
    <div
      className={"h-screen flex flex-col bg-[#5a5a5a] grow " + popp.className}
    >
      <Toaster position="top-center" className="absolute" />
      {/* Header */}
      <div className="w-full h-[69px] bg-black py-4 flex px-5 items-center">
        <span className={"text-2xl text-white " + bebas.className}>
          Courses
        </span>
      </div>
      {/* Content Area */}
      <div className="px-6 pt-6 flex flex-col gap-5">
        {/* Heading Title */}
        <CourseHeader />

        <div className={"mt-2 grid px-3 w-full " + popp.className}>
          <span className={"text-xl text-[#F2F2F2] " + bebas.className}>
            Published Courses
          </span>
          <div className="flex ps-2 py-2 gap-5 overflow-x-scroll scrollbar-hide">
            {courses.filter((item) => item.published).length !== 0 ? (
              courses.map((item) => {
                if (item.published) {
                  delay += 0.15;
                  return (
                    <CoursePill
                      delayTime={delay}
                      data={JSON.parse(JSON.stringify(item))}
                      key={item.code}
                    />
                  );
                }
              })
            ) : (
              <EmptySection />
            )}

            {/* <CoursePill delayTime={0.15} />
            <CoursePill delayTime={0.3} />
            <CoursePill delayTime={0.45} />
            <CoursePill delayTime={0.6} />
            <CoursePill delayTime={0.75} />
            <CoursePill delayTime={0.9} />
            <CoursePill delayTime={1.05} />
            <CoursePill delayTime={1.2} /> */}
          </div>
        </div>
        <div className={" grid px-3 w-full " + popp.className}>
          <span className={"text-xl text-[#F2F2F2] " + bebas.className}>
            Uploaded Courses
          </span>
          <div className="flex ps-3 py-2 gap-5 overflow-x-scroll scrollbar-hide">
            {/* Upload New */}
            <AddCourse
              publisherEmail={sesh?.user.email!}
              publisherName={sesh?.user.name!}
            />
            {courses.map((item) => {
              if (!item.published) {
                delay += 0.15;
                return (
                  <CoursePill
                    delayTime={delay}
                    data={JSON.parse(JSON.stringify(item))}
                    key={item.code}
                  />
                );
              }
            })}

            {/* <CoursePill delayTime={0.3} />
            <CoursePill delayTime={0.45} />
            <CoursePill delayTime={0.6} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
