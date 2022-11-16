import { deleteDoc, doc } from "firebase/firestore";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { useAuth } from "../lib/context";

export default function CourseCard({
  title,
  instructor,
  code,
  lecture,
  id,
  lab,
  tutorial,
}) {
  const { db, courses, setCourses } = useAuth();

  function handelClick() {
    setCourses((prev) => {
      return prev.filter((fish) => fish.id !== id);
    });
    const docRef = doc(db, "courses", id);
    deleteDoc(docRef)
      .then(() => {
        console.log("deleted");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body px-[20px] py-[15px]">
        <div className="flex justify-end gap-2">
          <button
            onClick={handelClick}
            className="btn btn-square btn-ghost btn-sm"
          >
            <RiDeleteBin7Line />
          </button>
          <button className="btn btn-square btn-outline btn-secondary btn-sm">
            <FiEdit2 />
          </button>
        </div>

        <h2 className="secondary-title">{title}</h2>
        <p>
          Instructor: <strong> {instructor}</strong>{" "}
        </p>
        <p>
          Course code: <strong> {code}</strong>
        </p>
        <div className="stats ">
          <div className="stat place-items-center">
            <div className="stat-title">Lecuter</div>
            <div className="stat-value text-xl">{lecture}</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Labs</div>
            <div className="stat-value text-xl">{lab}</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Tutorials</div>
            <div className="stat-value text-xl">{tutorial}</div>
          </div>
        </div>
        {/* <div className="card-actions  flex-row-reverse">
          <button className="btn btn-primary">Edit</button>
          <button className="btn btn-outline text-primary ">
            <AiFillDelete size="20" onClick={handelClick} />
          </button>
        </div> */}
      </div>
    </div>
  );
}
