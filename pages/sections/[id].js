import { SECTIONS } from ".";
import { useAuth } from "../../lib/context";
import DisplayCourse from "../../components/DisplayCourse";

export const getStaticPaths = () => {
  console.log(SECTIONS);
  const paths = SECTIONS.map((sec) => {
    return { params: { id: sec.name } };
  });
  return { paths: paths, fallback: false };
};

// context = paths

export const getStaticProps = (context) => {
  const sectionName = context.params.id;

  return {
    props: { sectionName: sectionName },
  };
};

export default function Section({ sectionName }) {
  const { currentUser } = useAuth();
  return (
    <>
      {currentUser ? (
        <DisplayCourse sectionName={sectionName} />
      ) : (
        <h1>Login access this page</h1>
      )}
    </>
  );
}
