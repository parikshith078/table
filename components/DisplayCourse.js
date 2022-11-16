import CourseCard from "./CourseCard";
import BottomBar from "./BottomBar";
import Canvas from "./Canvas";
import { useAuth } from "../lib/context";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export default function DisplayCourse({ sectionName }) {
  const { currentUser, db, courses, setCourses } = useAuth();

  // fetching subject data from firestore
  const q = query(
    collection(db, "courses"),
    where("userID", "==", currentUser.uid),
    where("sectionName", "==", sectionName)
  );

  useEffect(() => {
    onSnapshot(q, (querySnapshot) => {
      const temp = [];
      querySnapshot.forEach((doc) => {
        temp.push({ ...doc.data(), id: doc.id });
      });
      setCourses(temp);
    });
  }, []);

  return (
    <>
      {courses.length == 0 && <Canvas />}
      <div className="flex flex-wrap gap-2 justify-center my-4 pb-12">
        {courses.map((sub, index) => {
          return (
            <CourseCard
              key={index}
              title={sub.name}
              instructor={sub.instructor}
              code={sub.code}
              id={sub.id}
              tutorial={sub.tutorial}
              lecture={sub.lecture}
              lab={sub.lab}
            />
          );
        })}
      </div>

      <BottomBar sectionName={sectionName} />
    </>
  );
}
