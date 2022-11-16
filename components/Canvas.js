/* eslint-disable @next/next/no-img-element */
export default function Canvas() {
  return (
    <div className="hero min-h-[80vh] bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse px-24">
        {/* <img
          src="https://api.lorem.space/image/movie?w=260&h=400"
          className="max-w-sm rounded-lg shadow-2xl"
          alt="img"
        /> */}
        <div className="text-center lg:text-center">
          <h1 className="text-5xl font-bold">No Subjects Yet!</h1>
          <p className="py-6 text-center">
            Not yet any subjects Add a subject by selecting the {"'+'"} button.
          </p>
          {/* <button className="btn btn-primary">Add Subject</button> */}
        </div>
      </div>
    </div>
  );
}
