/* eslint-disable react/no-unknown-property */
import { Branch, Faculty } from "../lib/instituteInfo";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { useAuth } from "../lib/context";

export default function InputSub({ clickRef, sectionName }) {
  const { db, currentUser } = useAuth();
  const [subValue, setSubValue] = useState({
    name: "",
    code: "",
    instructor: "Course Instructor",
    lecture: 0,
    tutorial: 0,
    lab: 0,
    createdAt: serverTimestamp(),
    sectionName: sectionName,
  });

  const handelChange = (e) => {
    const { name, value } = e.target;
    setSubValue((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // pushs card values to database
  async function handelAdd() {
    try {
      const docRef = await addDoc(collection(db, "courses"), {
        ...subValue,
        userID: currentUser.uid,
        userEmail: currentUser.email,
      });
      console.log(subValue);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <>
      <label
        for="my-modal-6"
        ref={clickRef}
        className="btn modal-button hidden"
      ></label>

      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Subject!</h3>
          <form className="flex flex-col gap-4 m-4">
            <input
              onChange={handelChange}
              value={subValue.name}
              name="name"
              type="text"
              placeholder="Course Name"
              class="input input-bordered w-full "
            />
            <input
              onChange={handelChange}
              name="code"
              value={subValue.code}
              type="text"
              placeholder="Course Code"
              class="input input-bordered w-full "
            />
            <select
              value={subValue.instructor}
              name="instructor"
              onChange={handelChange}
              className="select select-bordered w-full "
            >
              <option disabled selected>
                Course Instructor
              </option>
              {/* <option value="avantika">Ms. Avantika </option>
              <option value="radhika">Ms. Radhika</option> */}
              {Faculty.map((opt, index) => (
                <option key={index} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {/* new no of lecture input */}
            <div className="stats stats-vertical lg:stats-horizontal  ">
              <div className="stat py-1">
                <div className="stat-title">Lecuters</div>
                {/* <div className="stat-value text-2xl">3</div> */}
                <select
                  name="lecture"
                  value={subValue.lecture}
                  onChange={handelChange}
                  className="select select-bordered text-lg select-sm w-[80%] max-w-xs"
                >
                  <option value={0} selected>
                    0
                  </option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </select>
              </div>

              <div className="stat py-1">
                <div className="stat-title">Labs</div>
                <select
                  name="lab"
                  value={subValue.lab}
                  onChange={handelChange}
                  className="select select-bordered text-lg select-sm w-[80%] max-w-xs"
                >
                  <option value={0} selected>
                    0
                  </option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </select>
              </div>

              <div className="stat py-1">
                <div className="stat-title">Tutorials</div>
                <select
                  name="tutorial"
                  value={subValue.tutorial}
                  onChange={handelChange}
                  className="select select-bordered text-lg select-sm w-[80%] max-w-xs"
                >
                  <option value={0} selected>
                    0
                  </option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </select>
              </div>
            </div>
          </form>
          <div className="modal-action justify-start gap-4 flex-row-reverse">
            <button onClick={handelAdd}>
              <label for="my-modal-6" className="btn btn-primary px-8 ">
                Add
              </label>
            </button>
            <label for="my-modal-6" className="btn  px-4 ">
              Cancel
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
