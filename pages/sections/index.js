import Link from "next/link";

export const SECTIONS = [
  { name: "SEM 3 Section A" },
  { name: "SEM 3 Section B" },
  { name: "SEM 3 ECE" },
  { name: "SEM 3 DSA" },
  { name: "SEM 5 Theory Basket Electives" },
  { name: "SEM 5 Electives" },
  { name: "SEM 5 Section A" },
  { name: "SEM 5 ECE" },
  { name: "SEM 5 DSA" },
  { name: "SEM 7" },
];

// context = paths

export default function Index() {
  return (
    <>
      <h1 className="text-5xl font-bold text-center my-2">Sections</h1>
      <div className="flex flex-wrap gap-4 justify-center m-4">
        {SECTIONS.map((val, ind) => {
          return (
            <div key={ind} className="card w-96 bg-base-100 shadow-xl ">
              <div className="card-body">
                <h2 className="card-title">{val.name}</h2>

                <div className="card-actions justify-end">
                  <Link href={"/sections/" + val.name}>
                    <button className="btn btn-secondary btn-outline">
                      Add Subjects
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex w-full justify-center">
        <Link href="/tables">
          <button className="btn btn-success btn-lg">Generate Timetable</button>
        </Link>
      </div>
    </>
  );
}
