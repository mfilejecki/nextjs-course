import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";

function UserProfile() {
  const changePasswordHandler = async (passwordData) => {
    try {
      const res = await fetch("/api/user/change-password", {
        method: "PATCH",
        body: JSON.stringify(passwordData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Something went wrong.");
      }
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
}

export default UserProfile;
