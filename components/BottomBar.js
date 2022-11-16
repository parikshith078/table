import { BsPlusLg } from "react-icons/bs";
import InputSub from "./InputSub";
import { useRef } from "react";
import { useAuth } from "../lib/context";
import Link from "next/link";

export default function BottomBar({ sectionName }) {
  const clickRef = useRef();

  const { courses } = useAuth();
  return (
    <>
      <div className="navbar min-h-[5rem] bottom-0 justify-center  px-16 fixed bg-base-100 shadow-inner">
        <div
          onClick={() => {
            clickRef.current.click();
            console.log("click");
          }}
          className="absolute top-[-1.6rem]  btn btn-primary rounded-3xl w-24 h-14 "
        >
          <BsPlusLg size="34" />
        </div>
        <div className="flex justify-end w-full">
          <Link href="/sections">
            <button
              className="btn btn-secondary"
              onClick={() => console.log(courses)}
            >
              Confirm
            </button>
          </Link>
        </div>
      </div>
      <InputSub clickRef={clickRef} sectionName={sectionName} />
    </>
  );
}

// toggle btn-active on click
