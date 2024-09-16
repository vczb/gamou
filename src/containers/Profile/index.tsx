import Breadcrumb from "@/components/Breadcrumb";
import ControlProfile from "@/components/ControlProfile";

const BREADCUMB = [
  { link: "/painel", label: "Painel" },
  { link: "/painel/eu", label: "Eu", active: true },
];

const Profile = () => {
  return (
    <div className="container mx-auto px-4 pb-28 pt-8">
      <Breadcrumb items={BREADCUMB} />
      <ControlProfile />
    </div>
  );
};

export default Profile;
